import Route from 'ember-route';
import RouteAccessMixin from 'ember-unauthorized/mixins/route-access';

export default Route.extend(RouteAccessMixin, {
  requiredFeatures: ['devFeature']
});
