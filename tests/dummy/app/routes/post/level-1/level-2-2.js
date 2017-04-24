import Ember from 'ember';

export default Ember.Route.extend({
  routeLayer: 'post-level',
  routeLayerFallback: 'unrelated-route',
});
