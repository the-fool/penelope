'use strict';

var penelopeServices = angular.module('penelopeServices', ['ngResource']);

penelopeServices.factory('Track', ['$resource', 
  function($r) {
    return $r('api/tracks', {}, {
        query: {method:'GET'},
        update: {method: 'POST'}
    });
}]);