var app = angular.module('starter')

.factory('factoryUpdateMoney', function($resource,URL) {
    return $resource("http://"+URL+"/users/updatemoney");
})
