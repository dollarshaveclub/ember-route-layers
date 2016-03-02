import Ember from 'ember';

export default Ember.Route.extend({
  routeLayer: 'post-level',

  actions: {
    exitRouteLayerFallback() {
      this.transitionTo('unrelated-route');
    }
  }
});
