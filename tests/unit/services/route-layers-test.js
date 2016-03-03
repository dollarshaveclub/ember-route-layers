import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:route-layers', 'Unit | Service | route layers', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

function createMockTransition(routeLayer) {
  return Ember.Object.extend({
    handlerInfos: Ember.A([
        Ember.Object.create({
          handler: Ember.Route.create({
            routeLayer
          })
        })
      ])
  }).create();
}

test('it has an Ember-observable stack', function(assert) {
  const service = this.subject();
  assert.equal(service.get('stack.firstObject'), undefined);

  const transition = createMockTransition('foo-route');
  service.push(transition);

  assert.equal(service.get('stack.firstObject.transition'), transition);
});
