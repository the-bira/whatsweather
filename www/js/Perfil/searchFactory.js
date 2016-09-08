angular.module('starter')

.factory('searchFactory', function($resource) {
  return $resource("https://www.dropbox.com/home?preview=city.list.json");
})
