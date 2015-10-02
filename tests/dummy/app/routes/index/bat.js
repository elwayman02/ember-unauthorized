import Ember from 'ember';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Ember.Route.extend(RouteAccessMixin, {
    authorize() {
        return true;
    }
});
