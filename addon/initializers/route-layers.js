import Ember from 'ember';
import RouteLayers from 'ember-route-layers/services/route-layers';

const EMBER_MAJOR_VERSION = Ember.VERSION.split('.')[0];

export function initialize() {
  const application = arguments[1] || arguments[0]; // eslint-disable-line prefer-rest-params

  application.register('service:route-layers', RouteLayers);
  application.inject('route', 'routeLayers', 'service:route-layers');

  const additionalRouteAttributes = {
    routeLayer: 'default',
    routeLayerFallback: 'index',

    afterModel(model, transition, ...args) {
      this._super(model, transition, ...args);
      if (!transition || !transition.promise) { return; }

      this.pushRouteLayer(transition);
    },

    pushRouteLayer(transition) {
      // Leaf route only
      const leafRouteName = Ember.A(transition.handlerInfos).get('lastObject.handler.routeName');
      if (this.routeName !== leafRouteName) { return; }

      transition.promise.then(() => {
        if (transition.isAborted) return;
        this.routeLayers.push(transition);
      });
    },
  };

  const actionHashName = EMBER_MAJOR_VERSION === '1' ? '_actions' : 'actions';

  additionalRouteAttributes[actionHashName] = {
    exitRouteLayer() {
      const exitPoint = this.routeLayers.pop();
      if (exitPoint) {
        exitPoint.transition.retry();
      } else if (this.get('router.router.currentHandlerInfos') === null) {
        // Initial transition must complete before we can send an action.
        this.get('router.router.activeTransition').then(() => {
          this.send('exitRouteLayerFallback');
        });
      } else {
        this.send('exitRouteLayerFallback');
      }
    },

    exitRouteLayerFallback() {
      this.transitionTo(this.get('routeLayerFallback'));
    },
  };

  Ember.Route.reopen(additionalRouteAttributes);
}

export default {
  name: 'route-layers',
  initialize,
};
