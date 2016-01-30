'use strict';

var penelopeDirectives = angular.module('penelopeDirectives', []);

penelopeDirectives.directive('masterRow', function () {
    return {
        templateUrl: '/static/partials/templates/master_row.html',
        restrict: 'A',
        scope: {
            track: '=',
            onClick: '&',
        },
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                element.css('background-color', 'blue');
                $scope.onClick()($scope.track);
            });
            element.bind('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.bind('mouseleave', function () {
                element.css('background-color', 'white');
            });
        }
    };
});

penelopeDirectives.directive('masterHead', function () {
    return {
        templateUrl: '/static/partials/templates/master_head.html',
        restrict: 'A'
    };
});