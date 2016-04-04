# Ember-Unauthorized

[![Build Status](https://travis-ci.org/elwayman02/ember-unauthorized.svg)](https://travis-ci.org/elwayman02/ember-unauthorized)
[![Ember Observer Score](http://emberobserver.com/badges/ember-unauthorized.svg)](http://emberobserver.com/addons/ember-unauthorized)
[![Dependency Status](https://www.versioneye.com/user/projects/560de55b5a262f0022000948/badge.svg?style=flat)](https://www.versioneye.com/user/projects/560de55b5a262f0022000948)
[![Code Climate](https://codeclimate.com/github/elwayman02/ember-unauthorized/badges/gpa.svg)](https://codeclimate.com/github/elwayman02/ember-unauthorized)
[![Codacy Badge](https://api.codacy.com/project/badge/aa67e5139d4845b5b884d9360ffcf5f1)](https://www.codacy.com/app/hawker-jordan/ember-unauthorized)

Ember Mixins for handling unauthorized access to application content

[View Demo](http://github.jhawk.co/ember-unauthorized/)

## Usage

Ember-Unauthorized currently provides two mixins: `access` and `route-access`. The former provides the base
implementation of this addon, with the latter providing route-specific code such as transitioning to an `unauthorized` route.
The examples below will use the `route-access` mixin, but you can customize your experience by using `access` directly
or creating more mixins for different scenarios. We welcome contributions if you think you have a common use-case!

### With Feature Flags

This addon has been optimized for use with [Ember-Feature-Flags](http://jhawk.co/ember-feature-flags):

```javascript
// routes/user-list.js
import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Ember.Route.extend(RouteAccessMixin, {
    requiredFeatures: ['userList']
});
```

If you are using a customized key name to access your feature flags, import the mixin into your app and set `featuresKey`:

```javascript
// mixins/route-access.js
import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Ember.Mixin.create(RouteAccessMixin, {
    featuresKey: 'featureFlags'
});
```

Then `import RouteAccessMixin from 'my-app-name/mixins/route-access';` instead of taking it directly from the addon.

It is also easy to use other feature flag implementations. Simply override `isFeatureDisabled`:

```javascript
// mixins/route-access.js
import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Ember.Mixin.create(RouteAccessMixin, {
    isFeatureDisabled(key) {
        return this.get('featureService').hasFeature(key); // Insert custom implementation here
    }
});
```

### Custom Authorization

Sometimes access to routes isn't solely determined by feature flags, such as through user role access control.
To address this, Ember-Unauthorized allows you to optionally implement an `authorize` method that returns true if
the content is authorized for the user.

```javascript
// route/admin.js
import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Ember.Route.extend(RouteAccessMixin, {
    authorize() {
        return this.get('user').isAdmin(); // Your custom authorization code
    }
});
```

#### Routes

The `route-access` mixin defines some default behavior for accessing unauthorized routes. When a user's authorization
fails, the mixin will automatically transition them to the `unauthorized` route. If your application uses a different
route for this behavior, it can be customized via `unauthorizedRoute`:

```javascript
// route/foo.js
import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Ember.Route.extend(RouteAccessMixin, {
    requiredFeatures: ['foo'],
    unauthorizedRoute: 'error'
});
```

Furthermore, if you do not want a transition to take place or need to add additional behavior, override the `unauthorized` method:

```javascript
// route/foo.js
import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Ember.Route.extend(RouteAccessMixin, {
    requiredFeatures: ['foo'],
    unauthorized() {
        this.notifications.send('You are not authorized to view this content'); // Custom behavior goes here
    }
});
```

## Contributing

This section outlines the details of collaborating on this Ember addon.

### Installation

* `git clone` this repository
* `cd ember-unauthorized`
* `npm install`
* `bower install`

### Running The Demo Application

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
