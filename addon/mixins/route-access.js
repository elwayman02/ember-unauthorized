import Ember from 'ember';
import AccessMixin from 'ember-unauthorized/mixins/access';

/**
 * Mixin to detect and handle attempts to access unauthorized routes
 * @module routeAccess
 */
export default Ember.Mixin.create(AccessMixin, {
  /**
   * Name of the route to redirect unauthorized users to
   * @type {string}
   * @default
   */
  unauthorizedRoute: 'unauthorized',

  /**
   * Handles unauthorized access attempts
   * @override
   */
  unauthorized() {
    this.transitionTo(this.get('unauthorizedRoute'));
  },

  /**
   * Checks to see if the user is authorized to access this route.
   * If not, transitions to the unauthorized route.
   */
  routeAccess: Ember.on('activate', function () {
    this.checkAuthorization();
  })
});
