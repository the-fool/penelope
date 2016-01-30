'use strict';

var penelopeDirectives = angular.module('penelopeDirectives', []);


/* --- PLAYLIST ROW --- */

penelopeDirectives.directive('playlistRow', function () {
    return {
        templateUrl: '/static/partials/templates/playlist_row.html',
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

/* --- PLAYLIST HEAD --- */

penelopeDirectives.directive('playlistHead', function () {
    return {
        templateUrl: '/static/partials/templates/playlist_head.html',
        restrict: 'A'
    };
});


/* --- LIBRARY SEARCH --- */

penelopeDirectives.directive('librarySearch', function() {
    return {
        restrict: 'EA',
        templateUrl: '/static/partials/templates/library_search.html',
    };
});