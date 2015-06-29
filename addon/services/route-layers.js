import Ember from 'ember';

export default Ember.Service.extend({

  routeLayerExitPointStack: [],

  push: function (transition) {

    var routeLayer = transition.handlerInfos.get('lastObject.handler.routeLayer');
    var stack = this.get('routeLayerExitPointStack');
    var exitPoint = {
      routeLayer: routeLayer,
      transition: transition,
    };

    // Transition within the same route layer: remove previous exit point
    if (stack[0] && stack[0].routeLayer === routeLayer) stack.shift();

    stack.unshift(exitPoint);
  },

  pop: function () {
    var stack = this.get('routeLayerExitPointStack');
    stack.shift(); // discard
    return stack.shift();
  }

});
