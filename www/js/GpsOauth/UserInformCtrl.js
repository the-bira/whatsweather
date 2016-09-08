angular.module('starter')

.controller('UserInformCtrl', function($resource, serviceWeather, $timeout,
  gpsOauthService, $ionicLoading, serviceLogin, factoryRegisterWeather, factoryUpdateMoney,
  $cordovaGeolocation, $timeout, $scope, $state, $stateParams, $rootScope, $ionicPopup, $localStorage, weatherFactory) {

  console.log($localStorage.user);
  var user_local = $localStorage.user;

  $scope.setCity = function(location) {
    $ionicLoading.show({
      template: 'Obtendo sua posição atual... <ion-spinner icon="android"></ion-spinner>'
    });
    $scope.location = location
    $timeout(countUp, 3000);
  }

  function countUp(location) {
    getLatLng($scope.location);
  }

  $scope.skip_question = function() {

    $ionicLoading.show({
      template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
    });

    weatherFactory.charge({location:serviceWeather.getLocation().location}, function(data) {
      console.log("BANCO0000000000",data[0]);

      $rootScope.weather_condition = data[0];
      $rootScope.count_weather = data[1];

    })

    $timeout(function() {
      $ionicLoading.hide();
      $state.go('app.localization');
    }, 10000)
  }





  var getLatLng = function(address) {
    $resource("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBGknmuLFXy-yBSHS1uaEIoIYLDX5Yc_Yo").get('', function(query) {
      console.log(query.results[0]);
      serviceWeather.setLocation(query.results[0]);
      var location = serviceWeather.getLocation();
      console.log(location);
      $ionicLoading.hide();
      $state.go('app.informSituation');
      return query

    })
  }

  $scope.getClima = function(clima) {
    user = {
      email: user_local.email,
      value: 10
    }
    console.log(clima);
    serviceWeather.setSituation(serviceWeather.getLocation(), clima);
    factoryRegisterWeather.save(serviceWeather.getLocation());

    var alertPopup = $ionicPopup.alert({
      title: 'Ganhou WeMoney',
      templateUrl: "templates/popups/popupCoins.html",
    });

    alertPopup.then(function(res) {
      factoryUpdateMoney.save(user,function(user){
        console.log(user);
        $rootScope.usernew = user;
        $localStorage.user = user;


      });
    });

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
  }
})





.directive('locationLocation', function($ionicModal, LocationService) {
  return {
    restrict: 'A',
    scope: {
      location: '=',
    },
    link: function($scope, element) {
      console.log('locationSuggestion started!');
      $scope.search = {};
      $scope.search.suggestions = [];
      $scope.search.query = "";
      $ionicModal.fromTemplateUrl('templates/location.html', {
        scope: $scope,
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      });
      element[0].addEventListener('focus', function(event) {
        $scope.open();
      });
      $scope.$watch('search.query', function(newValue) {
        if (newValue) {
          LocationService.searchAddress(newValue).then(function(result) {
            $scope.search.error = null;
            $scope.search.suggestions = result;
          }, function(status) {
            $scope.search.error = "There was an error :( " + status;
          });
        };
        $scope.open = function() {
          $scope.modal.show();
        };
        $scope.close = function() {
          $scope.modal.hide();
        };
        $scope.choosePlace = function(place) {
          $scope.location = place.description
          console.log(place);
          $scope.close();
        };
      });
    }
  }
})
