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

    penelopeServices.factory('CurrentPlaylist', [function () {
        var svc = {};
        svc.tracks = [];
        svc.add = function (tracks) {
            if (tracks.constructor !== Array) {
                tracks = [tracks];
            }
            for (var i = 0; i < tracks.length; i++) {
                svc.tracks.push({
                    id: tracks.pk,
                    title: tracks.title,
                    album: tracks.album,
                    artist: tracks.artist
                });
            }
        };

        return svc;
    }]);
})();
