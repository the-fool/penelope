'use strict';

var penelopeDirectives = angular.module('penelopeDirectives', []);
penelopeDirectives.baseTemplateUrl = '/static/partials/templates/';

/* --- PLAYLIST ROW --- */

penelopeDirectives.directive('playlistRow', function () {
    return {
        templateUrl: penelopeDirectives.baseTemplateUrl + 'playlist_row.html',
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
        templateUrl: penelopeDirectives.baseTemplateUrl + 'playlist_head.html',
        restrict: 'A'
    };
});

penelopeDirectives.directive('libraryView', ['Library', function(Lib) {
    function ctrl() {
        this.packages = Lib.query();
    }
    
    return {
     templateUrl: penelopeDirectives.baseTemplateUrl + 'library_view.html',
     scope: {},
     replace: true,
     controller: ctrl,
     controllerAs: 'libctrl',
     bindToController: true,
   };
}]);

/* --- LIBRARY SEARCH --- */

penelopeDirectives.directive('librarySearch', function() {
    return {
        restrict: 'EA',
        templateUrl: penelopeDirectives.baseTemplateUrl + 'library_search.html',
    };
});