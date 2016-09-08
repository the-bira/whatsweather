angular.module('starter')

.service('serviceWeather', function() {

  var location_weather = {}

  var setLocation = function(location) {
      location_weather.location = location.formatted_address,
      location_weather.latitude = location.geometry.location.lat,
      location_weather.longitude = location.geometry.location.lng,
      location_weather.situation = ""
  }


  var setSituation = function(location, situation) {
      location_weather.location = location.location,
      location_weather.latitude = location.latitude,
      location_weather.longitude = location.longitude,
      location_weather.situation = situation
  }


  var setLocationTitle = function(location,locationTitle ) {
      location_weather.location = locationTitle,
      location_weather.latitude = location.latitude,
      location_weather.longitude = location.longitude,
      location_weather.situation = location.situation
  }

  var setLatLng = function(location,lat , long ) {
      location_weather.location = location.location,
      location_weather.latitude = lat,
      location_weather.longitude = long,
      location_weather.situation = location.situation
  }

  var setWeather_favorite = function(location) {
      location_weather.location = location.location,
      location_weather.latitude = location.latitude,
      location_weather.longitude = location.latitude
  //    location_weather.situation = location.situation
  }

  var getLocation = function() {
    return location_weather;
  }

  return {
    setWeather_favorite:setWeather_favorite,
    setLocationTitle: setLocationTitle,
    setLatLng: setLatLng,
    setLocation: setLocation,
    setSituation: setSituation,
    getLocation: getLocation
  }





})
