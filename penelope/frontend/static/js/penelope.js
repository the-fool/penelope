'use strict';

var penelopeApp = angular.module('penelopeApp', [
    'ngRoute',
    'penelopeControllers',
    'penelopeDirectives',
    'penelopeServices'
]);

penelopeApp.config(['$routeProvider', function ($rp) {
    $rp.
      when('/jukebox', {
        templateUrl: 'static/partials/jukebox.html',
        controller: 'JukeboxCtrl',
        controllerAs: 'jb'
      }).
      otherwise({
        redirectTo: '/jukebox'
      });
}]);