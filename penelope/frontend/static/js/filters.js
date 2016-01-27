'use strict';

var penelopeFilters = angular.module('penelopeFilters', []).filter('seconds', function() {
    return function(s) {
        s = parseInt(s);
        var min = s/60 | 0;
        var sec = s%60
        return min + ":" + (sec < 10 ? '0' : '') + sec; 
    }
});