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

    penelopeDirectives.directive('libraryView', ['Library', '$timeout', function (Lib, $timeout) {
        function ctrl($scope) {
            /*jshint validthis: true */
            this.packages = Lib.query();
            this.selectedTracks = {};
            this.appendToPlaylist = function () {
                console.log(this.selectedTracks);
            };

            this.clickTrack = function ($event, pack, track) {
                // single-select click
                if (!$event.ctrlKey && !$event.metaKey) {
                    var p = this.selectedTracks[pack.pk];
                    
                    // on pristine state
                    if (!p) {
                        track.selected = true;
                    }
                    // on dirty state
                    else if (p) {
                        // with a single selection, a click should replace or negate it
                        if (p.length === 1) {
                            if (p[0] === track) {
                                track.selected = false;
                            } else {
                                p[0].selected = false;
                                track.selected = true;
                            }
                        }
                        // with multiple selected tracks, a click becomes The One
                        else if (p.length > 1) {
                            for (var i = 0; i < this.selectedTracks[pack.pk].length; i++) {
                                this.selectedTracks[pack.pk][i].selected = false;
                            }
                            track.selected = true;
                        }
                        // in either case, we will delete the property and build it from scratch
                        // in order to avoid a memory leak (unending list of "selected: false")
                        delete this.selectedTracks[pack.pk];
                    }
                } else if ($event.ctrlKey || $event.metaKey) {
                    track.selected = !track.selected;
                }

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
