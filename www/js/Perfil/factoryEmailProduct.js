var app = angular.module('starter')


.factory('factorySendEmailProduct', function ($resource,URL) {
      return $resource('http://'+URL+'/users/register_buy');
});
