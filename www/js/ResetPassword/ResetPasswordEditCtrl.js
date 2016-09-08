angular.module('starter')

.controller('ResetPasswordEditCtrl', function($scope, factoryResetPassword,
  factoryResetPasswordKeyEnter, $ionicPopup, $state, serviceResetPassword,
  factoryResetPasswordEdit, $rootScope, $ionicLoading) {


$scope.resetPasswordEdit = function(user) {
  $ionicLoading.show({
    template: 'Loading...'
  });
  serviceResetPassword.setUser(
    $rootScope.user.password_reset_key,
    user.password,
    user.password_confirmation
  );
  $rootScope.user = serviceResetPassword.getUser();

  factoryResetPasswordEdit.update({
    key: user.password_reset_key
  }, {
    user: $rootScope.user
  }, function(user) {
    $ionicLoading.hide();
    $ionicPopup.alert({
      title: 'Atenção!',
      template: 'Troca de Senha efetuada!'
    });
    $state.go('app.login');
  }, function(error) {
    $ionicLoading.hide();
    $ionicPopup.alert({
      title: 'Erro!',
      template: 'Senha invalida!'
    });
  });
}

})
