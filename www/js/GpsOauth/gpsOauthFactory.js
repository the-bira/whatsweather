var app = angular.module('starter')

app.factory('factoryRegisterWeather', function($resource,URL) {
  return $resource("http://"+URL+"/timeline_weathers");
})
