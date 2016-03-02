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
  this.route('unrelated-route');
});

export default Router;
