var angular = require('angular');

// Manually import sources since SDK is not npm-compatible yet :(
var emApi = angular.module('emApi', []);
require('energimolnet-ng/src/resource-factory')(emApi);
require('energimolnet-ng/src/url')(emApi);
require('energimolnet-ng/src/energimolnet-api')(emApi);
require('energimolnet-ng/src/date-util')(emApi);
require('energimolnet-ng/src/models/accounts')(emApi);
require('energimolnet-ng/src/models/meters')(emApi);
require('energimolnet-ng/src/models/consumptions')(emApi);

var app = angular.module('app', [
  require('angular-ui-router'),
  'emApi',
  require('./visualizer')
]);

module.exports = app.name;

app.constant('apiBaseUrl', 'https://app.energimolnet.se/');

app.run(function(energimolnetAPI) {
  energimolnetAPI.setToken('9f999b72772410cfb4fe0d4309b5f9dabb01e2fafcd7ba946c6cdc11aa8e');
});

app.config(function($locationProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/visualizer');
  $locationProvider.html5Mode(false);
});
