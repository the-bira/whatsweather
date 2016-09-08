angular.module('starter')

.controller('loginSocialCtrl', function(factoryRegister, serviceLogin,
  factoryLogin, factoryRegisterTwitter, factoryLoginTwitter, $ionicPopup, factoryCheckRegister,
  $scope, $state, $stateParams, $rootScope, $timeout, $ionicLoading,
  ionicMaterialInk, $base64, factoryCheckRegisterTwitter, factoryUpdateMoney, $cordovaPushV5,
  $localStorage,$firebaseAuth) {

  ionicMaterialInk.displayEffect();

  var toDataURL = function(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      return dataURL
    };
    img.src = src;
  }

  $scope.isloggednow = function() {
    if ($localStorage.user === undefined) {
      $scope.deslogar();
      $localStorage.islogged = false;
      $state.go('app.login');
    } else if ($localStorage.islogged === true) {
      $state.go('app.gpsoauth');
    }
    console.log("user", $localStorage.user);
    console.log("logado", $localStorage.islogged);
  }



  $scope.deslogar = function() {
    $localStorage.islogged = false;
    $localStorage.$reset();
    console.log("user", $localStorage.user);
    console.log("logado", $localStorage.islogged);
    delete $scope.user
  }


  $scope.loginFacebook = function() {

    var ref = $firebaseAuth();

    ref.$signInWithPopup("facebook").then(
      function(authData){
        // Pegando as informações do Facebook
        $scope.userfacebook = authData;
        var user = authData;
        var email_user = authData.user.email
        $ionicLoading.show({
          template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
        });

        // Verificando se há registro desse usuário
        factoryCheckRegister.get({
          email: email_user
        }, function(user_registed) {
          //Se o Usuário já existir ele vai setar o usuário
          console.log("Usuário já registrado ")

          $rootScope.user = user_registed;
          $localStorage.user = user_registed;
          $localStorage.islogged = true;


          $ionicLoading.hide();
          // E ir para pagina
          $state.go('app.gpsoauth');

        }, function(error) {
          //Caso o usuário não exista  ele prossegue para o registro
          // converte a imagem para base64Img
          toDataURL(authData.user.photoURL, function(base64Img) {
            $scope.image = (base64Img.slice(22, base64Img.length))
            $scope.$apply()
          });
          // Setando um tempo para execução do registro do usuário
          // tempo para à conversão da imagem

          $timeout(function() {
            // Cria e salva o usuário
            var set_User = {}
            set_User.name = $scope.userfacebook.user.displayName,
              set_User.email = $scope.userfacebook.user.email,
              set_User.idRedeSocial = $scope.userfacebook.user.uid,
              set_User.password = $scope.userfacebook.user.uid,
              set_User.password_confirmation = $scope.userfacebook.user.uid,
              set_User.image_profile = $scope.image,
              set_User.we_money = 0

            // Registrando um novo usuário
            factoryRegister.save(set_User);

            // Adiciona os 50 pontos para quando há um novo registro do usuário
            user = {
              email: user.user.email,
              value: 50,
              escope: "register"
            }



            // Popup para exibição dos pontos ganhos
            var alertPopup = $ionicPopup.alert({
              title: 'Ganhou WeMoney',
              templateUrl: " templates/popups/popupCoins50.html",
              //template: '<img src="img/icones/moedas/moeda-grande.png"><a>50</a> <br/>Você ganhou 50 WeMoney por se registrar'
            });
            alertPopup.then(function(res) {
              factoryUpdateMoney.save(user, function(user) {
                console.log(user);
                $rootScope.user = user;
                $localStorage.user = user;
                $localStorage.islogged = true;

              });

              $ionicLoading.hide();
              $state.go('app.gpsoauth');
            });

          }, 5000);
        })
      }).catch(function(error){
        console.log("Login Failed!", error);
        $ionicPopup.alert({
          title: 'Erro!',
          template: 'Login Falhou'
        });
      });
    }


  $scope.loginTwitter = function() {


    var ref = new Firebase("https://whatsweatherapp.firebaseio.com");
    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $ionicPopup.alert({
          title: 'Erro!',
          template: 'Login Falhou'
        });
      } else {
        $ionicLoading.show({
          template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
        });

        var user = authData;

        factoryCheckRegisterTwitter.get({
            idRedeSocial: user.twitter.id
          }, function(user_registed) {

            //REGISTRAR NO LOCALSTORAGE AQUI
            $rootScope.user = user_registed;
            $localStorage.user = user_registed;
            $localStorage.islogged = true;
            $ionicLoading.hide();
            $state.go('app.gpsoauth');
          },
          function(error) {
            toDataURL(user.twitter.profileImageURL, function(base64Img) {
              $scope.image = (base64Img.slice(22, base64Img.length))
              $scope.$apply();
            });


            $timeout(function() {
              console.log($scope.image);

              //USUÁRIO AINDA NÃO REGISTRADO E NÃO
              // NO LOCALSTORAGE
              //SETANDO NESSE SERVICE PARA USAR NA PROXIMA pagina
              $rootScope.user_twitter = {}
              $rootScope.user_twitter.name = user.twitter.displayName,
                $rootScope.user_twitter.email = "email",
                $rootScope.user_twitter.idRedeSocial = user.twitter.id,
                $rootScope.user_twitter.password = user.twitter.id,
                $rootScope.user_twitter.password_confirmation = user.twitter.id
              $rootScope.user_twitter.image_profile = $scope.image

              $ionicLoading.hide();
              $state.go('app.finishedLogin');
            }, 3000);

          }
        )
      }
    })
  }



  $scope.register = function() {
    $state.go('app.register');
  }

  $scope.user = {};

  $scope.voltarHome = function voltarHome() {
    $state.go("app.login");
  }

  $scope.loginEmail = function(userlogin) {

    factoryCheckRegister.get(userlogin, function(user_registed) {

      $rootScope.user = user_registed;
      $localStorage.user = user_registed;
      $localStorage.islogged = true;
      $state.go('app.gpsoauth');

      },

      function(error) {
        $ionicPopup.alert({
          title: 'Erro!',
          template: 'Insira as informações novamente'
        });
        console.log(error);
      })
  }
})
