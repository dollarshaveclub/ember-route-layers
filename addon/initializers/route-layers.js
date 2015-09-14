import RouteLayers from 'ember-route-layers/services/route-layers';

export function initialize (container, application) {
  application.register('service:route-layers', RouteLayers);
}

export default {
  name: 'route-layers',
  initialize: initialize
};
