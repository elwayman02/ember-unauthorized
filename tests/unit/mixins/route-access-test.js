import Ember from 'ember';
import RouteAccessMixin from '../../../mixins/route-access';
import { module, test } from 'qunit';

module('Unit | Mixin | route access');

// Replace this with your real tests.
test('it works', function(assert) {
  var RouteAccessObject = Ember.Object.extend(RouteAccessMixin);
  var subject = RouteAccessObject.create();
  assert.ok(subject);
});
