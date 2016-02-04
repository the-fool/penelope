(function () {
    'use strict';

    var penelopeServices = angular.module('penelopeServices', ['ngResource']);

    penelopeServices.factory('Track', ['$resource',
        function ($r) {
            return $r('api/tracks', {}, {
                query: {
                    method: 'GET'
                },
                update: {
                    method: 'POST'
                }
            });
    }]);

    penelopeServices.factory('Library', ['$resource',
        function ($r) {
            return $r('api/library', {}, {
                query: {
                    method: 'GET',
                    isArray: true
                },
                update: {
                    method: 'POST'
                }
            });
    }]);

    penelopeServices.factory('PlaylistQueue', [function () {
        var svc = {};
        
        svc.tracks = [];
        svc.activeTrack = {};
        svc.setActive = function(track) {
            for (var prop in track) {
            svc.activeTrack[prop] = track[prop];
            }
        };
        svc.add = function (tracks) {
            if (tracks.constructor !== Array) {
                tracks = [tracks];
            }
            for (var i = 0; i < tracks.length; i++) {
                var newTrack = {},
                    source = tracks[i];
                for (var attr in source) {
                    if (attr !== "$$hashKey" && attr !== "selected") {
                        newTrack[attr] = source[attr];
                    }
                }
                svc.tracks.push(newTrack);
            }
        };

        return svc;
    }]);
})();
