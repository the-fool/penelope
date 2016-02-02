'use strict';

var penelopeControllers = angular.module('penelopeControllers', []);

penelopeControllers.controller('JukeboxCtrl', ['Track', 
    function(Tracks) {
        this.tracks = Tracks.query();
        
        
        this.clickTrack = function(track) {
          alert('clicked ' + track.title);  
        };
    }]);


