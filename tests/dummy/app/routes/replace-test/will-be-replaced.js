import Ember from 'ember';

export default Ember.Route.extend({
  routeLayer: 'replace-test-will-be-replaced',

  actions: {
    doReplaceWith() {
      this.replaceWith('replace-test.with-this-target');
    },
  },

});
