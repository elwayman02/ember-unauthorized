/* globals blanket, module */
// jscs: disable

var options = {
  modulePrefix: 'ember-unauthorized',
  filter: '//.*ember-unauthorized/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    lcovOptions: {
      outputFile: 'lcov.dat',
      renamer: function (moduleName) {
        var expression = /^ember-unauthorized/;
        var name = moduleName.replace(/^ember-unauthorized\/config/, 'config');
        return name.replace(expression, 'app') + '.js';
      }
    },
    reporters: ['lcov'],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
