import Ember from 'ember';

var stack = [];

export default Ember.Service.extend({

  push: function (transition) {

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

    stack.push(exitPoint);
  },

  pop: function () {
    stack.pop(); // discard
    return stack.pop();
  }

});
