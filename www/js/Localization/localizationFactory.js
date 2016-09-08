angular.module('starter')

.factory('weatherFactory', function($resource,URL) {
   return $resource(' http://'+URL+'/timeline_weathers/bylocation', {}, {
    charge: {method:'POST', isArray:true}
 });
})
