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

    penelopeDirectives.directive('libraryView', ['Library', '$timeout', function (Lib) {
        function ctrl() {
            /*jshint validthis: true */
            this.packages = Lib.query();
            this.selectedTracks = {};
            this.appendToPlaylist = function () {
                console.log(this.selectedTracks);
            };

            this.clickTrack = function ($event, pack, track) {
                var p = this.selectedTracks[pack.pk];

                // on pristine state
               
                // dirty state
                if (p) {
                    if (!$event.ctrlKey && !$event.metaKey) {
                        for (var i = 0; i < this.selectedTracks[pack.pk].length; i++) {
                            this.selectedTracks[pack.pk][i].selected = false;
                        }
                        delete this.selectedTracks[pack.pk];
                    }
                }
                 track.selected = !track.selected;
                // populate the object
                if (track.selected) {
                    if (this.selectedTracks[pack.pk]) {
                        this.selectedTracks[pack.pk].push(track);
                    } else {
                        this.selectedTracks[pack.pk] = [track];
                    }
                }
            };

            this.expand = function ($event, pack) {
                pack.show = !pack.show;
                if (!pack.show) {
                    $($event.currentTarget).parent().find('li.track').removeClass('selected');
                }
            };

            this.selectPackage = function ($event, pack) {
                pack.selected = !pack.selected;
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
