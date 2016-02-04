(function () {
    'use strict';

    var penelopeApp = angular.module('penelopeApp', [
    'ngRoute',
    'selectionModel',
    'penelopeControllers',
    'penelopeDirectives',
    'penelopeServices',
    'penelopeFilters'
    ]);

    penelopeApp.config(['$routeProvider', function ($rp) {
        $rp.
        when('/jukebox', {
            templateUrl: 'static/partials/jukebox.html',
        }).
        otherwise({
            redirectTo: '/jukebox'
        });
    }]);
})();
