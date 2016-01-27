'use strict';

var penelopeDirectives = angular.module('penelopeDirectives', []);

penelopeDirectives.directive('masterRow', function() {
    return {
        templateUrl: '/static/partials/templates/master_row.html',
        restrict: 'A',
    };
});