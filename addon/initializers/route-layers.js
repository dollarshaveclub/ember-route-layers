import Ember from 'ember';
import RouteLayers from 'ember-route-layers/services/route-layers';

export function initialize () {
  let application = arguments[1] || arguments[0];

  application.register('service:route-layers', RouteLayers);
  application.inject('route', 'routeLayers', 'service:route-layers');

  Ember.Route.reopen({

    routeLayer: 'default',

    afterModel: function (model, transition) {
      this._super(...arguments);

      // Leaf route only
      var leafRouteName = Ember.A(transition.handlerInfos).get('lastObject.handler.routeName');
      if (this.routeName !== leafRouteName) return;

      transition.promise.then(() => {
        if (transition.isAborted) return;
        this.routeLayers.push(transition);
      });
    },

    actions: {

      exitRouteLayer: function () {
        var exitPoint = this.routeLayers.pop();
        if (exitPoint) exitPoint.transition.retry();
        else this.send('exitRouteLayerFallback');
      },

      exitRouteLayerFallback: function () {
        this.transitionTo('index');
      }

    }

  });

}

export default {
  name: 'route-layers',
  initialize: initialize
};
