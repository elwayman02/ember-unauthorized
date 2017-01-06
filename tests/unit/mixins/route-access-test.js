import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';
import {module} from 'qunit';
import test from 'dummy/tests/ember-sinon-qunit/test';

let subject;

module('Unit | Mixin | route access', {
  setup() {
    let RouteAccessObject = Ember.Object.extend(RouteAccessMixin);
    subject = RouteAccessObject.create({
      transitionTo() {}
    });
  }
});

test('unauthorized calls transitionTo', function (assert) {
  let spy = this.stub(subject, 'transitionTo');

  subject.unauthorized();

  assert.ok(spy.calledOnce, 'transitionTo was called once');
  assert.ok(spy.calledWithExactly(subject.get('unauthorizedRoute')), 'transitionTo called with unauthorizedRoute');
});

test('routeAccess calls checkAuthorization', function (assert) {
  let spy = this.stub(subject, 'checkAuthorization');

  subject.routeAccess();

  assert.ok(spy.calledOnce, 'checkAuthorization was called once');
});
