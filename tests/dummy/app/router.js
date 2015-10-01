import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin');
  this.route('index', { path: '/' }, function () {
    this.route('bar');
    this.route('bat');
    this.route('foo');
  });
  this.route('unauthorized');
});

export default Router;
