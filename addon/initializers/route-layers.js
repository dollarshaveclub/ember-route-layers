
export function initialize (container, application) {

  var routeLayersService = container.lookup('service:route-layers');

  Ember.Route.reopen({

    routeLayer: 'default',

    afterModel: function (model, transition) {
      this._super.apply(this, arguments);
      routeLayersService.push(transition);
    },

    _actions: { // @see https://github.com/emberjs/ember.js/issues/5394

      exitRouteLayer: function () {
        var exitPoint = routeLayersService.pop();
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
