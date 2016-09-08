angular.module('starter')

.controller('ResetPasswordCtrl', function($scope, factoryResetPassword,
  factoryResetPasswordKeyEnter, $ionicPopup, $state, serviceResetPassword,
  factoryResetPasswordEdit, $rootScope, $ionicLoading, ionicMaterialInk, ionicMaterialMotion, $timeout, $stateParams) {

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();


  $scope.resetPassword = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryResetPassword.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Atenção!',
        template: 'Foi enviado um código para o seu email!'
      });
      console.log(user);
      $state.go('app.resetkeyenter');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Email invalido, verifique os dados ou se o email já foi cadastrado'
      });
    });
  }




})
