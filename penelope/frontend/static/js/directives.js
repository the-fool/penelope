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

            var clearPackage = function (key) {
                if (!this.selectedTracks[key]) { return; }
                for (var i = 0; i < this.selectedTracks[key].length; i++) {
                    this.selectedTracks[key][i].selected = false;
                }
                delete this.selectedTracks[key];
            };

            this.packages = Lib.query();
            this.selectedTracks = {};
            this.appendToPlaylist = function () {
                console.log(this.selectedTracks);
            };

            this.clickTrack = function ($event, pack, track) {
                var keys = Object.keys(this.selectedTracks);
                // dirty state
                if (keys) {
                    if (!$event.ctrlKey && !$event.metaKey) {
                        for (var key in this.selectedTracks) {
                            clearPackage(key);
                        }
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
                //console.log(this.selectedTracks);
            };

            this.expand = function (pack) {
                pack.show = !pack.show;
                if (!pack.show) {
                    clearPackage(pack.pk);
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
