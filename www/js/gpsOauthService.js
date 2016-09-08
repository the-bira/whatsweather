angular.module('starter')

.service('gpsOauthService', function() {

  var center = {
    lat: 0,
    lng: 0,
    zoom: 1
  };

  var tempo = {


  };

  var gettempo = function(){
    return tempo;

  }

  var settempo = function(tempo){
    tempo.tempo = tempo;

  }



  var getPosition = function() {
    return center;
  }

  var setPosition = function(lat, long) {
    center.lat = lat;
    center.lng = long;
    center.zoom = 15  }

  var message = {

  }





  var mainMarker = {

  };





  var setMaker = function(lat, long,message) {
    mainMarker.lat = lat;
    mainMarker.lng = long;
    mainMarker.focus = true;
    mainMarker.message = '<div class="cardweather" ><img src="/img/'+ message+'48.png"></div>';
  }

  var getMaker = function() {
    return mainMarker;
  }







  return {
    getPosition: getPosition,
    setPosition: setPosition,
    setMaker: setMaker,
    getMaker: getMaker,
    settempo: settempo,
    gettempo: gettempo
  }

})
