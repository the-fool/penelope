'use strict';

var penelopeControllers = angular.module('penelopeControllers', []);

penelopeControllers.controller('JukeboxCtrl', ['Track', 
    function(Track) {
        this.tracks = Track.query();
        
        this.clickTrack = function(track) {
          alert('clicked ' + track.title);  
        };
    }]);

penelopeControllers.controller('LibraryCtrl',[function() {
    
}]);