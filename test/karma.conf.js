/*global module */
module.exports = function ( config ) {
  'use strict';

  var files = [
    '../node_modules/angular/lib/angular.js',
    '../node_modules/angular-mocks/angular-mocks.js',
    '../src/currency-filter.js',
    '../test/unit/currency-filter.spec.js'
  ];

  config.set({
    files : files,
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    autoWatch: true,
    singleRun: false,
    colors: true
  });
};
