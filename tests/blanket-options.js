/* globals blanket, module */

var options = {
  modulePrefix: 'ember-route-layers',
  filter: '//.*ember-route-layers/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
   lcovOptions: {
     outputFile: 'lcov.dat',
     renamer: function (moduleName) { return moduleName.replace(/^ember-route-layers/, 'addon') + '.js'; }
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
