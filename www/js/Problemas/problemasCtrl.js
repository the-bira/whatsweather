angular.module('starter')

.controller('problemasCtrl', function($scope,factorySendEmailProblem) {

  $scope.sendProblem = function(user_inform, $resource){

    factorySendEmailProblem.save({name:user_inform.name, email:user_inform.email, description:user_inform.description})

  }


})
