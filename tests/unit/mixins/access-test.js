import Ember from 'ember';
import AccessMixin from 'ember-unauthorized/mixins/access';
import { module, test } from 'qunit';
import Sinon from 'sinon';

let subject;
const features = ['foo', 'bar'];

module('Unit | Mixin | access', {
    setup() {
        const AccessObject = Ember.Object.extend(AccessMixin);
        subject = AccessObject.create({
            features: Ember.Object.create({
                [features[0]]: false,
                [features[1]]: true
            })
        });
    }
});

test('isFeatureDisabled returns true if feature is disabled', function (assert) {
    assert.ok(subject.isFeatureDisabled(features[0]), 'feature is disabled');
});

test('isFeatureDisabled returns false if feature is enabled', function (assert) {
    assert.ok(!subject.isFeatureDisabled(features[1]), 'feature is enabled');
});

test('isFeatureDisabled allows configurable features key', function (assert) {
    const key = 'baz';

    assert.ok(subject.isFeatureDisabled(key), 'feature is disabled by omission');

    subject.setProperties({
        featuresKey: 'featureFlags',
        featureFlags: Ember.Object.create({ [key]: true })
    });
    assert.ok(!subject.isFeatureDisabled(key), 'custom featuresKey was used to find enabled feature');
});

test('checkAuthorization does nothing by default', function (assert) {
    const disabledStub = Sinon.stub(subject, 'isFeatureDisabled');
    const unauthStub = Sinon.stub(subject, 'unauthorized');

    subject.checkAuthorization();

    assert.ok(!disabledStub.called, 'isFeatureDisabled was not called');
    assert.ok(!unauthStub.called, 'unauthorized was not called');
});

test('checkAuthorization checks required features', function (assert) {
    const disabledStub = Sinon.stub(subject, 'isFeatureDisabled', function () {
        return false;
    });
    const unauthStub = Sinon.stub(subject, 'unauthorized');
    subject.set('requiredFeatures', features);

    subject.checkAuthorization();

    assert.ok(disabledStub.calledTwice, 'isFeatureDisabled was called twice');
    let call = disabledStub.getCall(0);
    assert.ok(call.calledWithExactly(features[0]), 'isFeatureDisabled was called with first feature key');
    call = disabledStub.getCall(1);
    assert.ok(call.calledWithExactly(features[1]), 'isFeatureDisabled was called with first feature key');

    assert.ok(!unauthStub.called, 'unauthorized was not called');
});

test('checkAuthorization stops checking required features once a disabled one is found', function (assert) {
    const disabledStub = Sinon.stub(subject, 'isFeatureDisabled', function () {
        return true;
    });
    const unauthStub = Sinon.stub(subject, 'unauthorized');
    subject.set('requiredFeatures', features);

    subject.checkAuthorization();

    assert.ok(disabledStub.calledOnce, 'isFeatureDisabled was called once');
    assert.ok(unauthStub.calledOnce, 'unauthorized was called once');
});

test('checkAuthorization checks custom authorize method', function (assert) {
    Sinon.stub(subject, 'isFeatureDisabled', function () {
        return false;
    });
    const unauthStub = Sinon.stub(subject, 'unauthorized');
    subject.set('authorize', Ember.K);
    const authorizeStub = Sinon.stub(subject, 'authorize', function () {
        return true;
    });

    subject.checkAuthorization();

    assert.ok(authorizeStub.calledOnce, 'authorize was called once');
    assert.ok(!unauthStub.called, 'unauthorized was not called');
});

test('checkAuthorization does not check authorize if features were disabled', function (assert) {
    Sinon.stub(subject, 'isFeatureDisabled', function () {
        return true;
    });
    const unauthStub = Sinon.stub(subject, 'unauthorized');
    subject.set('requiredFeatures', features);
    subject.set('authorize', Ember.K);
    const authorizeStub = Sinon.stub(subject, 'authorize', function () {
        return true;
    });

    subject.checkAuthorization();

    assert.ok(!authorizeStub.called, 'authorize was not called');
    assert.ok(unauthStub.called, 'unauthorized was called');
});
