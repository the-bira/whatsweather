var app = angular.module('starter')


.factory('factorySendEmailProblem', function ($resource,URL) {
      return $resource("http://"+URL+"/users/register_problem");

});
