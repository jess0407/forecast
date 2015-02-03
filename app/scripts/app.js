'use strict';

/**
 * @ngdoc overview
 * @name forecastApp
 * @description
 * # forecastApp
 *
 * Main module of the application.
 */
angular
  .module('forecastApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'underscore',
    'moment',
    'd3',
    'jQuery',
    'Highcharts'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('underscore', [])
.factory('_', function() {
  return window._;
});
angular.module('moment', [])
.factory('moment', function() {
  return window.moment;
});
angular.module('d3', [])
.factory('d3', function() {
  return window.d3;
});
angular.module('jQuery', [])
.factory('$', function() {
  return window.$;
});
angular.module('Highcharts', [])
.factory('Highcharts', function() {
  return window.Highcharts;
});
