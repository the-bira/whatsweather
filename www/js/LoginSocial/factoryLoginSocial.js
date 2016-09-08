var app = angular.module('starter')



.factory('factoryRegister', function($resource,URL) {
    return $resource("http://"+URL+"/users/create");
})

.factory('factoryCheckRegister', function($resource,URL) {
    return $resource("http://"+URL+"/users/checkRegister/:email");
})

.factory('factoryCheckRegisterTwitter', function($resource,URL) {
    return $resource("http://"+URL+"/users/checkRegisterTwitter/:idRedeSocial");
})


.factory('factoryRegisterTwitter', function($resource,URL) {
    return $resource("http://"+URL+"/users/create/twitter");
})

.factory('factoryLoginTwitter', function($resource,URL) {
    return $resource("http://"+URL+"/users/login/twitter/:idRedeSocial");
})

.factory("factoryLogin",function($resource,URL){
  return $resource("http://"+URL+"/users/login/:email");
})
