angular.module('starter')

.controller('gpsOauthCtrl', function(NgMap, $ionicLoading, gpsOauthService,
  factoryRegisterWeather, $cordovaGeolocation, $timeout, serviceLogin, serviceWeather,
  $scope, $state, $stateParams, $rootScope, $ionicPopup, ionicMaterialInk,
   factoryUpdateMoney,$localStorage,weatherFactory) {

  $scope.$parent.clearFabs();
  ionicMaterialInk.displayEffect();

  var user_local = $localStorage.user;

  $scope.skip_question = function() {
    $ionicLoading.show({
      template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
    });

    weatherFactory.charge({location:serviceWeather.getLocation().location}, function(data) {
      console.log("BANCO0000000000",data[0]);

      $rootScope.weather_condition = data[0];
      $rootScope.count_weather = data[1];

    });
    $state.go('app.localization');
    $timeout(function() {
      $ionicLoading.hide();
      $state.go('app.localization');
    }, 10000)
  }


  var posOptions = {
    timeout: 20000,
    enableHighAccuracy: false
  };


  var confirmPopup = $ionicPopup.confirm({
    title: 'Permitir o Uso do GPS',
    template: 'Precisamos de sua permissão para acessar o uso do GPS e localização do seu aparelho',
  });


  var onSuccess = function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log("Aqui foi")
    serviceWeather.setLatLng(serviceWeather.getLocation(), position.coords.latitude, position.coords.longitude)

    console.log(serviceWeather.getLocation());
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({
      'location': pos
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          console.log(results[0]);
          serviceWeather.setLocationTitle(serviceWeather.getLocation(), results[0].formatted_address);
          console.log(serviceWeather.getLocation());
        } else {
          console.info('No results found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });

    $ionicLoading.hide();
  };

  var onError = function(error) {
    console.error('It was not possible to get the current location due to: ' + error);
    $ionicLoading.hide();
    alert("Não funciona")
  }

  confirmPopup.then(function(res) {

    if (res) {

      $ionicLoading.show({
        template: 'Obtendo sua posição atual...'
      });

      cordova.plugins.locationAccuracy.request(function(success) {
        console.log("Successfully requested accuracy: " + success.message);

        console.log("aprove");
        $timeout(navigator.geolocation.getCurrentPosition(onSuccess, onError, posOptions), 5000)

      }, function(error) {


        console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);

        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
          alert("user cancel")
          $ionicLoading.hide();
          $state.go('app.gps');

          if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
            cordova.plugins.diagnostic.switchToLocationSettings();
          }
        }
        $ionicLoading.hide();
        $state.go('app.gps');

      }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    } else {
      $state.go('app.gps');
    }
  });




  $scope.getClima = function(clima) {

    console.log("aqui");
    serviceWeather.setSituation(serviceWeather.getLocation(), clima)
    console.log(serviceWeather.getLocation());

    factoryRegisterWeather.save(serviceWeather.getLocation());

    var alertPopup = $ionicPopup.alert({
      title: 'Ganhou WeMoney',
      templateUrl: " templates/popups/popupCoins.html"
    });

    console.log(user_local.email);
    alertPopup.then(function(res) {
      userop = {
        email: user_local.email,
        value: 10,
        scope: 'update'
      }
      factoryUpdateMoney.save(userop,function(user){
        console.log(user);
        $rootScope.usernew = user;
        $localStorage.user = user;

      })


      $ionicLoading.show({
        template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
      });

      weatherFactory.charge({location:serviceWeather.getLocation().location}, function(data) {
        console.log(data[0]);
        $rootScope.weather_condition = data[0];
        $rootScope.count_weather = data[1];
      })

      $timeout(function() {
        $ionicLoading.hide();
        $state.go('app.localization');
      }, 10000)


    });

  }
})
