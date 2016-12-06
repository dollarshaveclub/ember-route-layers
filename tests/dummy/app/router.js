import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('post', {
    path: '/post/:post_id'
  }, function() {
    this.route('level-1', function() {
      this.route('level-2', function() {
        this.route('level-3');
      });
    });
  });
  this.route('replace-test', function() {
    this.route('will-be-replaced');
    this.route('with-this-target');
  });
  this.route('unrelated-route');
  this.route('auto-exited-route');
});

export default Router;
