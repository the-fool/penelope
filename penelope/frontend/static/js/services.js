(function () {
    'use strict';

    var penelopeServices = angular.module('penelopeServices', ['ngResource']);

    penelopeServices.factory('Track', ['$resource', function ($r) {
        return $r('/api/tracks', {}, {
            query: {
                method: 'GET'
            },
            update: {
                method: 'POST'
            }
        });
    }]);

    penelopeServices.factory('Player', ['$http', function ($http) {
        var svc = {};
        svc.state = {};
        svc.start = function (pk) {
            if (!pk) {
                return;  
            }
            
            $http({
                method: 'GET',
                url: '/api/player/start/' + pk,
            }).then(function success(response) {
                if (response.status === 200) {
                    angular.copy(response.data, svc.state);
                } else {
                    console.log("Response code: " + response.status);
                }
            }, function error(response) {
                throw "Player: Start threw up " + response.status;
            });
        };
        svc.pause = function () {
            $http({
                method: 'GET',
                url: '/api/player/pause',
                params: {}
            }).then(function success(response) {
                if (response.status === 200) {
                    angular.copy(response.data, svc.state);
                } else {
                    console.log("Response code: " + response.status);
                }
            }, function error(response) {
                throw "Player: Start threw up " + response.status;
            });
        };
        return svc;
    }]);

    penelopeServices.factory('Library', ['$resource',
        function ($r) {
            return $r('/api/library', {}, {
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

        svc.position = 0;
        svc.queue = [];
        svc.activeTrack = {};
        svc.setActive = function (track, pos) {
            if (svc.queue.length === 0) {
                return;
            } // I look forward to widespread support for ES6 
            else if (!track) {
                var pos = 0;
                var track = svc.queue[0];
            }

            svc.position = pos;
            angular.extend(svc.activeTrack, track, {
                state: 'playing',
                time: 0
            });
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
