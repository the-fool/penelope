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
        var position = 0;
        svc.queue = [];
        svc.activeTrack = {};
        svc.setActive = function(track, pos) {
            svc.position = pos;
            angular.extend(svc.activeTrack, track, {state: 'playing', time: 0});
        };
        svc.add = function (tracks) {
            if (tracks.constructor !== Array) {
                tracks = [tracks];
            }
            for (var i = 0; i < tracks.length; i++) {
                var newTrack = angular.copy(tracks[i]);
                delete newTrack.selected;
                delete newTrack.$$hashKey;
                svc.queue.push(newTrack);
            }
        };

        return svc;
    }]);
})();
