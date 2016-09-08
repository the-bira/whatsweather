var app = angular.module('starter')

app.factory('factoryFavoritePlaces', function($resource,URL) {
  return $resource("http://"+URL+"/favorites/search");
})

app.factory('factoryAddFavoritePlaces', function($resource,URL) {
  return $resource("http://"+URL+"/favorites/insertFavorite", {}, {
        query: {method:'GET',isArray:true}
      });
})
