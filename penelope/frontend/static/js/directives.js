'use strict';

var penelopeDirectives = angular.module('penelopeDirectives', []);

penelopeDirectives.directive('masterRow', function () {
    return {
        templateUrl: '/static/partials/templates/master_row.html',
        restrict: 'A',
        scope: {track: '='},
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                element.html('You clicked me!');
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