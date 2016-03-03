import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    // since this is called on the first transition, ember tells you to call
    // `send` on the transition, not `this`.
    transition.send('exitRouteLayer');
  }
});
