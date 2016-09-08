angular.module('starter')

.controller('favoritePlacesCtrl', function(NgMap, $resource, gpsOauthService,
  weatherFactory, $scope, $state, $stateParams, serviceWeather, serviceLogin, $timeout, serviceWeather,
  $rootScope, $ionicPopup, $ionicLoading, factoryRegisterWeather, factoryFavoritePlaces,
  factoryAddFavoritePlaces,$localStorage) {

 var user = $localStorage.user;


  factoryFavoritePlaces.query({
    email: user.email
  }, function(data) {
    $scope.favorites = data
  });
  $scope.favorite = {}

  // var get_favorites = function() {
  //   factoryFavoritePlaces.query({
  //     email: 'joaohenrique.pereira.almeida@gmail.com'
  //   }, function(data) {
  //     $scope.favorites = data
  //   });
  // }

  var insert_favorite = function() {
    var favorite = $scope.favorite
    console.log($scope.favorite);
    email_user = user.email
    factoryAddFavoritePlaces.save({
      email: email_user,
      favorite: favorite
    }, function(error) {
      console.log(error);
    });
  }

  var getLatLng = function(address) {
    $resource("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBGknmuLFXy-yBSHS1uaEIoIYLDX5Yc_Yo").get('', function(query) {
      console.log(query.results[0].geometry.location);
      $scope.favorite.latitude = query.results[0].geometry.location.lat
      $scope.favorite.longitude = query.results[0].geometry.location.lng
      $scope.favorite.location = address
      console.log("Esse é o escopo");
      console.log($scope.favorite);
      return query
    })
  }

  $scope.addFavorite = function(searchFavorite) {
    console.log(searchFavorite);
    getLatLng(searchFavorite)
    // $scope.favorites.push(searchFavorite)
    $timeout(insert_favorite, 3000);
  }

  $scope.search_weather = function(favorite) {
    serviceWeather.setWeather_favorite(favorite);
    $ionicLoading.show({
      template: 'Recebendo as informações... <ion-spinner icon="android"></ion-spinner>'
    });
    $timeout(change_page, 2000);
  }

  $scope.search_not_favorite_weather=function(not_favorite){
      console.log("Pegando o valor não favorito");
      console.log(not_favorite);
      getLatLng(not_favorite)
      console.log($scope.favorite);
      $ionicLoading.show({
        template: 'Recebendo as informações... <ion-spinner icon="android"></ion-spinner>'
      });
      $timeout(refresh_inform, 3000);

  }

  var change_page = function(){
    $ionicLoading.hide();
    $state.go('app.localization');

  }

  var refresh_inform = function(){
    console.log($scope.favorite);
    serviceWeather.setWeather_favorite($scope.favorite);
    change_page();
  }


})




.directive('locationFavorite', function($ionicModal, LocationService){
  return {
    restrict: 'A',
    scope: {
      fav: '=',
    },
    link: function($scope, element){
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
          }, function(status){
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
          $scope.fav = place.description
          console.log(place);

           $scope.close();

        // $scope.close();
        };
      });
    }
  }
})
