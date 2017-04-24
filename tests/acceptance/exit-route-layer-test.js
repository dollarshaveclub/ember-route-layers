import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

/*

Run the dummy app to view an explanation of the test setup.

*/
moduleForAcceptance('Acceptance | exit route layer action');

test('stays on the index route if clicked after first transition to index', function(assert) {
  visit('/');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('goes back to the index route if clicked after transition to post', function(assert) {
  visit('/');
  click('a#view-post-1');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('goes back to the post route if clicked after transition to post.level-1', function(assert) {
  visit('/');
  click('a#view-post-1');
  click('a#view-level-1');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/post/1');
  });
});

test('goes back to the post route if clicked after transition to post.level-1, post.level-1.level-2', function(assert) {
  visit('/');
  click('a#view-post-1');
  click('a#view-level-1');
  click('a#view-level-2');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/post/1');
  });
});

test('goes back to the post route if clicked after transition to post.level-1, post.level-1.level-2, post.level-1.level-2.level-3', function(assert) {
  visit('/');
  click('a#view-post-1');
  click('a#view-level-1');
  click('a#view-level-2');
  click('a#view-level-3');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/post/1');
  });
});

test('goes back to the index route if directly visiting post.level-1', function(assert) {
  visit('/post/1/level-1');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('goes to the unrelated-route from level-2 (overridden exitRouteLayerFallback)', function(assert) {
  visit('/post/1/level-1/level-2');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/unrelated-route');
  });
});

test('goes to the unrelated-route from level-2 (overridden exitRouteLayerFallback) after transition to post.level-1', function(assert) {
  visit('/post/1/level-1');
  click('a#view-level-2');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/unrelated-route');
  });
});

test('goes to the unrelated-route from level-2-2 (overridden routeLayerFallback property)', function(assert) {
  visit('/post/1/level-1/level-2-2');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/unrelated-route');
  });
});

test('it can exitRouteLayer on the first transition', function(assert) {
  visit('/auto-exited-route');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('it replaces transition in stack on replaceWith call', function(assert) {
  visit('/replace-test');
  click('a#will-be-replaced');
  click('#do-replace-with');
  click('#exit-route-layer');

  andThen(function() {
    assert.equal(currentURL(), '/replace-test');
  });
});
