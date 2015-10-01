import Ember from 'ember';

/**
 * Mixin to detect and handle attempts to access unauthorized routes
 * @module routeAccess
 */
export default Ember.Mixin.create({
  /**
   * Name of the route to redirect unauthorized users to
   * @type {string}
   * @default
   */
  unauthorizedRoute: 'unauthorized',

  /**
   * Name of the key used to access feature flags
   * @type {string}
   * @default
   */
  featuresKey: 'features',

  /**
   * List of features required to be active for this route to be accessed
   * @type {Array.string}
   * @default
   */
  requiredFeatures: [],

  /**
   * Optional method to perform additional authorization, such as user access control
   */
  authorize: null,

  /**
   * Determines whether a required feature is disabled
   * @param {string} key The name of the feature
   * @returns {boolean} True if the feature is disabled
   */
  isFeatureDisabled(key) {
    return Ember.isEqual(this.get(`${this.get('featuresKey')}.${key}`), false);
  },

  /**
   * Handles unauthorized access attempts
   */
  unauthorized() {
    this.transitionTo(this.get('unauthorizedRoute'));
  },

  /**
   * Checks to see if the user is authorized to access this route.
   * If not, transitions to the unauthorized route.
   */
  routeAccess: Ember.on('activate', function () {
    const requiredFeatures = this.get('requiredFeatures');
    let unauthorized = false;

    if (Ember.isPresent(requiredFeatures)) {
      requiredFeatures.forEach((key) => { // Make sure each required feature is enabled
        unauthorized = unauthorized || this.isFeatureDisabled(key);
      });
    }

    if (Ember.isEqual(Ember.typeOf(this.authorize), 'function')) {
      unauthorized = unauthorized || !this.authorize(); // Perform additional authorization
    }

    if (unauthorized) {
      this.unauthorized();
    }
  })
});
