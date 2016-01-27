'use strict';

var penelopeDirectives = angular.module('penelopeDirectives', []);

penelopeDirectives.directive('masterRow', function() {
    return {
        templateUrl: '/static/partials/templates/master_row.html',
        restrict: 'A',
    };
});

penelopeDirectives.directive('masterHead', function() {
    return {
        templateUrl: '/static/partials/templates/master_head.html',
        restrict: 'A'
    };
});