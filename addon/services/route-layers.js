import Ember from 'ember';

export default Ember.Service.extend({

  stack: Ember.computed(function() {
    return Ember.A([]);
  }),

  push: function (transition) {

    // console.log('[service:route-layers push]', transition);

    var stack = this.get('stack');

    if (transition.urlMethod === 'replace') {
      var replacedId = transition.sequence - 1;
      var lastId = stack.get('lastObject.transition.sequence');
      if (replacedId === lastId) stack.popObject();
    }

    var routeLayer = transition.handlerInfos.get('lastObject.handler.routeLayer');
    var exitPoint = {
      routeLayer: routeLayer,
      transition: transition,
    };

    if (routeLayer === 'default') stack.length = 0;

    // Transition to layer in stack: remove it and any above
    for (var i = 0; i < stack.length; i++) {
      if (stack[i].routeLayer === routeLayer) {
        stack.length = i;
      }
    }

    stack.pushObject(exitPoint);

    // console.log('[routeLayer push] stack', JSON.stringify(stack.map(o => `${o.routeLayer}: ${o.transition.targetName}`)));
  },

  pop: function () {
    var stack = this.get('stack');
    stack.popObject(); // discard
    return stack.popObject();
  },

});
