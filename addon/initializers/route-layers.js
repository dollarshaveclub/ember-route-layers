
export function initialize (container, application) {
  var RouteLayer = Ember.Object.extend();
  application.register('service:route-layers', RouteLayer);
}

export default {
  name: 'route-layers',
  initialize: initialize
};
