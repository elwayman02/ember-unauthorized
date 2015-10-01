export default {
  name: 'features',
  initialize(application) {
    application.inject('route', 'features', 'service:features');
  }
};
