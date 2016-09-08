angular.module('starter')

.controller('ResetPasswordKeyEnterCtrl', function($scope, factoryResetPassword,
  factoryResetPasswordKeyEnter, $ionicPopup, $state, serviceResetPassword,
  factoryResetPasswordEdit, $rootScope, $ionicLoading) {


    $scope.resetPasswordKeyEnter = function(user) {
      $ionicLoading.show({
        template: 'Loading...'
      });
      factoryResetPasswordKeyEnter.get(user, function(user) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Atenção!',
          template: 'Chave confirmada!'
        });
        serviceResetPassword.setUser(
          user.password_reset_key,
          null,
          null
        );
        $rootScope.user = serviceResetPassword.getUser();
        console.log("User", serviceResetPassword.getUser());
        $state.go('app.resetedit');
      }, function(error) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Erro!',
          template: 'Chave expirada ou invalida!'
        });
      });
    }
}
)
