import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';
import { module, test } from 'qunit';
import Sinon from 'sinon';

let subject;

module('Unit | Mixin | route access', {
    setup() {
        const RouteAccessObject = Ember.Object.extend(RouteAccessMixin);
        subject = RouteAccessObject.create({
            transitionTo: Ember.K
        });
    }
});

test('unauthorized calls transitionTo', function (assert) {
    const spy = Sinon.stub(subject, 'transitionTo');

    subject.unauthorized();

    assert.ok(spy.calledOnce, 'transitionTo was called once');
    assert.ok(spy.calledWithExactly(subject.get('unauthorizedRoute')), 'transitionTo called with unauthorizedRoute');
});

test('routeAccess calls checkAuthorization', function (assert) {
    const spy = Sinon.stub(subject, 'checkAuthorization');

    subject.routeAccess();

    assert.ok(spy.calledOnce, 'checkAuthorization was called once');
});
