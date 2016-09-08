angular.module('starter')

.controller('finishedLogin', function(factoryRegister,factoryRegisterTwitter,
  serviceLogin,factoryLogin ,$scope,$ionicPopup,$state,$rootScope,factoryUpdateMoney,$timeout) {


      $ionicPopup.alert({
        title: 'Complete suas Informações',
        template: 'Por favor informe o email'
      });

      var user = $rootScope.user_twitter;
      console.log(user);

      $scope.registerTwitter= function(email){
        var setUser = {}
          setUser.name = user.name,
          setUser.email = email,
          setUser.idRedeSocial = user.idRedeSocial,
          setUser.password = user.idRedeSocial,
          setUser.password_confirmation = user.idRedeSocial,
          setUser.image_profile = user.image_profile,
          setUser.we_money = 0

      factoryRegisterTwitter.save(setUser,function(user){




          $timeout(function(){
            setUser.value = 50;
            setUser.escope = "register"
            factoryUpdateMoney.save(setUser,function(){});
            $state.go('app.login');
          },2000)

          $ionicPopup.alert({
            title: 'Cadastro Realizado ',
            template: 'Por favor tente novamente \n o login com o twitter. Como boas vindas você recebe 50 WeMoney'
          });

        },function(){
          $ionicPopup.alert({
            title: 'Ocorreu um Erro ',
            template: 'Por favor Informe outro email'
          });

        });
      }

})
