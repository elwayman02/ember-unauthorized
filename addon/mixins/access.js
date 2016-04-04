import Ember from 'ember';

/**
 * Mixin to detect and handle attempts to access unauthorized content
 * @module access
 */
export default Ember.Mixin.create({
  /**
   * Name of the key used to access feature flags
   * @type {string}
   * @default
   */
  featuresKey: 'features',

  /**
   * List of features required to be active for this route to be accessed
   * @type {Array}
   * @default
   */
  requiredFeatures: [],

  /**
   * Optional method to perform additional authorization, such as user access control
   */
  authorize: null,

  /**
   * Handles unauthorized access attempts; should be overridden
   */
  unauthorized: Ember.K,

  /**
   * Determines whether a required feature is disabled
   * @param {string} key The name of the feature
   * @returns {boolean} True if the feature is disabled
   */
  isFeatureDisabled(key) {
    // Note: Use Ember.isEqual to treat undefined features as enabled
    // This is not the default behavior for ember-feature-flags, so we coerce undefined to false
    return !this.get(`${this.get('featuresKey')}.${key}`);
  },

  checkAuthorization() {
    let requiredFeatures = this.get('requiredFeatures');
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
  }
});
