(function () {
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
                /*jshint unused: false */
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

    /* --- PLAYLIST VIEW --- */

    penelopeDirectives.directive('playlistView', ['CurrentPlaylist', function (CurrentPlaylist) {
        function ctrl() {
            /*jshint validthis: true */
            this.playlist = CurrentPlaylist.tracks;
        }

        return {
            templateUrl: penelopeDirectives.baseTemplateUrl + 'playlist_view.html',
            scope: {},
            controller: ctrl,
            controllerAs: 'playlistCtrl',
            bindToController: true
        };
    }]);

    penelopeDirectives.directive('libraryView', ['Library', function (Lib) {
        function ctrl() {
            /*jshint validthis: true */
            this.packages = Lib.query();
            this.selectedTracks = [];
            this.appendToPlaylist = function () {
                console.log(this.selectedTracks);
            };
            this.expand = function ($event, pack) {
                pack.show = !pack.show;
                if (!pack.show) {
                    // in order to be "angular", I think I need a "one-way" data-binding
                    // I only want to remove classes at certain events, 
                    // but not add them in the absence of events
                    // However -- if there are 100k songs in a library, 
                    // then I do not want that many $watchers -- 
                    // and maybe this low-level DOM-centric approach is best? 
                    $($event.currentTarget).parent().find('li').removeClass('selected');
                }
            };
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

    penelopeDirectives.directive('librarySearch', function () {
        return {
            restrict: 'EA',
            templateUrl: penelopeDirectives.baseTemplateUrl + 'library_search.html',
        };
    });
})();
