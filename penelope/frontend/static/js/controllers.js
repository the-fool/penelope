'use strict';

var penelopeControllers = angular.module('penelopeControllers', []);

penelopeControllers.controller('JukeboxCtrl', ['Track', 
    function(Track) {
        this.tracks = Track.query();
    }]);

penelopeControllers.controller('LibraryCtrl',[function() {
    
}]);