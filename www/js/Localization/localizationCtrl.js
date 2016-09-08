angular.module('starter')

.controller('localizationCtrl', function(NgMap, $resource, gpsOauthService,
  weatherFactory, $scope, $state, $stateParams, serviceWeather, serviceLogin, $ionicModal,
  $rootScope, $ionicPopup, $ionicLoading, factoryRegisterWeather,
  $ionicSlideBoxDelegate, $interval, $firebaseArray,$timeout,$ionicScrollDelegate,$filter) {

  //  window.document.getElementById('back').className = serviceWeather.getLocation().situation
  $scope.change = false;
  $scope.maker = factoryRegisterWeather.query();
  $scope.weather_condition = {}
  $scope.moon = moon_phase();

   var currentDate = $filter('date')(new Date(), 'HH');

   if(currentDate >= 6 && currentDate < 18 ){
      $scope.currentHourDay = true;
      $scope.currentHourNight = false;

   }else {
     $scope.currentHourNight = true;
     $scope.currentHourDay = false;
   }





  console.log($scope.weather_condition);

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
        $state.go('app.chat')
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


  function moon_phase() {
    // 0 - Lua nova
    //  0.25	- Primeiro Quarto
    // 0.5	Lua Cheia
    // 0.75	Ultimo Quarto
    var phase = SunCalc.getMoonIllumination( /*Date*/ new Date())
    console.log(phase.phase);
    if (phase.phase < 0.25) {
      return "Lua Nova"
    }
    if (phase.phase < 0.50) {
      return "Lua Crescente"
    }
    if (phase.phase < 0.75) {
      return "Lua Cheia"
    }
    if (phase.phase < 1.0) {
      return "Lua Minguante"
    }
  }

  $scope.location = serviceWeather.getLocation().location;
  console.log("Location",serviceWeather.getLocation());
  console.log(moon_phase());

  //  SunCalc.getMoonIllumination(/*Date*/ timeAndDate)

  $scope.searchCity = function() {
    $state.go("app.favoritePlaces");
  };

  function getUV(){
    var resource = $resource('http://api.openweathermap.org/v3/uvi/:lat,:long/current.json?&APPID=3e2bf3867a63b5d049f0a30a906c2e63',
  {
    lat: '@lat',
    long: '@long'
  })
  return resource;
  };


var lt = serviceWeather.getLocation().latitude
var log = serviceWeather.getLocation().longitude

 var lat = (parseInt(lt));
 var long =(parseInt(log));
var uV = getUV().get({
  lat:lat,
  long:long
},function(indexUV){
  $scope.indexUV = {}
  $scope.indexUV.index = indexUV.data

  // Avaliação do indice de UV
  if (indexUV.data <= 2.9){
        $scope.indexUV.risk = "Baixo"
  }else{
    // todo
  }
  if (indexUV.data <= 5.9){
    $scope.indexUV.risk = "Moderado"
  }else{
    // todo
  }
  if(indexUV.data <= 7.9){
        $scope.indexUV.risk = "Alto"
  }else{
    // todo
  }
  if(indexUV.data <= 10.9){
        $scope.indexUV.risk = "Muito Alto"
  }else{
    // todo
  }
  if(indexUV.data <= 10.9){
        $scope.indexUV.risk = "Extremo"
  }else{
    // todo
  }

  console.log(indexUV.data);
})


  function getURI() {
    var resource = $resource('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=":id")and u="c"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', {
      id: '@id'
    });
    return resource;
  }



  var city = serviceWeather.getLocation().location;
  console.log(serviceWeather.getLocation().location);

  var datapost = getURI().get({
    id: city
  }, function(query) {
    var data = query.query.results
    console.log("SERRR",data);

    var data = query.query.results.channel
    console.log("DATA",data.item);
    var code = data.item.condition.code
    $rootScope.weather_conditionAPI = weather_inform(code);
    console.log("cccccccccccc",$rootScope.weather_conditionAPI);
    setweather();
    // Variáveis de Temperatura
    var temp = {}
    temp.atual = data.item.condition.temp
    temp.high = data.item.forecast[0].high
    temp.low = data.item.forecast[0].low
    $scope.temp = temp

    // Variável de fase da Lua

    // última atualização
    $scope.last_update = data.lastBuildDate

    console.log(code);

    $scope.termics = data.atmosphere
    $scope.sun = data.astronomy
    $scope.wind = data.wind

    var speed = data.wind.speed*3.6
    var temp = data.item.condition.temp
    console.log(speed);
    console.log(temp);

    console.log("Tempo",((33+((10*(Math.sqrt(speed))) + (10.45- speed))*(( temp -33)/22))));
    var weather = ((33+((10*(Math.sqrt(speed))) + (10.45- speed))*(( temp -33)/22)));
    $scope.weather_chill = parseInt(weather);

    // console.log(13.12+0.6215*temp -11.37*(speed^0.16)+0.3965*temp*(speed^0.16))
    //  (33+(10*(Math.sqrt(speed))+10.45-speed)*((temp -33)/22));

    totaldays = data.item.forecast
    var days = [];

    for (var i = 1; i < 7; i++) {
      days.push(totaldays[i])
      $scope.days = days;
    }
  })




  $scope.verify = function(origem, destino) {
    if (origem || destino) {
      $scope.change = false
    }
  }

  $scope.shuffle_way = function(origem, destino) {
      console.log("change routes");

      $scope.origem1 = destino
      $scope.destino1 = origem
      $scope.change = true

    }
    ////////////////////////
    //Opção de Chat
  $rootScope.location = serviceWeather.getLocation().location

  var messagesRef = new Firebase('https://whtappchat.firebaseio.com/chats/' + $rootScope.location);
  var ref = messagesRef;
  $rootScope.messagesObj = $firebaseArray(messagesRef);
  console.log($rootScope.messagesObj);

  var now = Date.now();
  var cutoff = now - 7 * 24 * 60 * 60 * 1000;
  // var old = ref.orderByChild('created_at').endAt(cutoff).limitToLast(1);
  // var listener = old.on('child_added', function(shot) {
  //   shot.ref().remove();
  // });

  $scope.$watch('messagesObj', function(value) {
    var messagesObj = angular.fromJson(angular.toJson(value));
    $timeout(function() {
      scrollBottom()
    });
    $scope.messages = [];

    angular.forEach(messagesObj, function(message, key) {
      $scope.messages.push(message);
    });

    if ($scope.messages.length) {
      loaded = true;
    }
  }, true);


  $scope.submitAddMessage = function(newMessage) {
    $rootScope.messagesObj.$add({
      created_by: $rootScope.user.name,
      content: newMessage,
      email: $rootScope.user.email,
      created_at: Date.now()
    });
    this.newMessage = "";

    scrollBottom();
  };


  var scrollBottom = function() {
    // Resize and then scroll to the bottom
    $ionicScrollDelegate.resize();
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom();
    });
  }

  //////////////////////
function setweather(){
  if($rootScope.count_weather === 0){
    $scope.messageAPI = true;

console.log("bbbbbbbbbbbbb",$rootScope.weather_conditionAPI);



    if ($rootScope.weather_conditionAPI.image === "sol") {
      $scope.weather_condition.image = $scope.weather_conditionAPI.image
      $scope.weather_condition.icon = "sol-img"
      $rootScope.weather_condition = 'sol'

    }
    if ($rootScope.weather_conditionAPI.image === "nuvem") {
      $scope.weather_condition.image = $scope.weather_conditionAPI.image
      $scope.weather_condition.icon = "nuvem-img"
      $rootScope.weather_condition = 'nuvem'
    }
    if ($rootScope.weather_conditionAPI.image === "chuva") {
      $scope.weather_condition.image = $scope.weather_conditionAPI.image
      $scope.weather_condition.icon = "wi wi-rain chuva-img"
      $rootScope.weather_condition = 'chuva'
    }
    if ($rootScope.weather_conditionAPI.image === "raio") {
      $scope.weather_condition.image = $scope.weather_conditionAPI.image
      $scope.weather_condition.icon = "ion-ios-thunderstorm-outline raio-img"
      $rootScope.weather_condition = 'raio'
    }
    if ($rootScope.weather_conditionAPI.image === "neve") {
      $scope.weather_condition.image = $scope.weather_conditionAPI.image
      $scope.weather_condition.icon = "neve-img"
      $rootScope.weather_condition = 'neve'
    }



  }
  else{

  if ($rootScope.weather_condition === "sol") {
    $scope.weather_condition.image = $rootScope.weather_condition
    $scope.weather_condition.icon = "sol-img"

  }
  if ($rootScope.weather_condition === "nuvem") {
    $scope.weather_condition.image = $rootScope.weather_condition
    $scope.weather_condition.icon = "nuvem-img"
  }
  if ($rootScope.weather_condition === "chuva") {
    $scope.weather_condition.image = $rootScope.weather_condition
    $scope.weather_condition.icon = "wi wi-rain chuva-img"
  }
  if ($rootScope.weather_condition === "raio") {
    $scope.weather_condition.image = $rootScope.weather_condition
    $scope.weather_condition.icon = "ion-ios-thunderstorm-outline raio-img"
  }
  if ($rootScope.weather_condition === "neve") {
    $scope.weather_condition.image = $rootScope.weather_condition
    $scope.weather_condition.icon = "neve-img"
  }
}

}

/////////////////////////////////////


  // Não desça. Eu sei que vc vai descer kkkk

  var weather_inform = function(cod) {

    console.log(cod);
    var inform = {}
      // if(cod = ){
      //     inform.icon = wi-yahoo- ,
      //     inform.condition =   ""
      // }

    if (cod === "1") {
      inform.icon = "wi-yahoo-1",
        inform.condition = "Tempestade Tropical",
        inform.image = "chuva"
    }
    if (cod === "2") {
      inform.icon = "wi-yahoo-2",
        inform.condition = "Furação",
        inform.image = "chuva"
    }
    if (cod === "3") {
      inform.icon = "wi-yahoo-3",
        inform.condition = "Tempestade Severa",
        inform.image = "chuva"
    }
    if (cod === "4") {
      inform.icon = "wi-yahoo-4",
        inform.condition = "Trovoadas",
        inform.image = "raio"
    }
    if (cod === "5") {
      inform.icon = "wi-yahoo-5",
        inform.condition = "Chuva e Neve",
        inform.image = "neve"
    }
    if (cod === "6") {
      inform.icon = "wi-yahoo-6",
        inform.condition = "Chuva e Granizo fino",
        inform.image = "chuva"
    }
    if (cod === "7") {
      inform.icon = "wi-yahoo-7",
        inform.condition = "Neve e Granizo fino",
        inform.image = "neve"
    }
    if (cod === "8") {
      inform.icon = "wi-yahoo-8",
        inform.condition = "Garoa Gélida",
        inform.image = "neve"
    }
    if (cod === "9") {
      inform.icon = "wi-yahoo-9",
        inform.condition = "Garoa",
        inform.image = "chuva"

    }
    if (cod === "10") {
      inform.icon = "wi-yahoo-10",
        inform.condition = "Chuva Gélida",
        inform.image = "chuva"
    }
    if (cod === "11") {
      inform.icon = "wi-yahoo-11",
        inform.condition = "Chuvisco",
        inform.image = "chuva"
    }
    if (cod === "12") {
      inform.icon = "wi-yahoo-12",
        inform.condition = "Chuva",
        inform.image = "chuva"
    }
    if (cod === "13") {
      inform.icon = "wi-yahoo-13",
        inform.condition = "Neve em Flocos Finos",
        inform.image = "neve"
    }
    if (cod === "14") {
      inform.icon = "wi-yahoo-14",
        inform.condition = "Leve precipitação de Neve",
        inform.image = "neve"
    }
    if (cod === "15") {
      inform.icon = "wi-yahoo-15",
        inform.condition = "Vento com neve",
        inform.image = "neve"
    }
    if (cod === "16") {
      inform.icon = "wi-yahoo-16",
        inform.condition = "Neve",
        inform.image = "neve"
    }
    if (cod === "17") {
      inform.icon = "wi-yahoo-17",
        inform.condition = "Chuva de Granizo",
        inform.image = "chuva"
    }
    if (cod === "18") {
      inform.icon = "wi-yahoo-18",
        inform.condition = "Pouco Granizo",
        inform.image = "neve"
    }
    if (cod === "19") {
      inform.icon = "wi-yahoo-19",
        inform.condition = "Pó em suspensão",
        inform.image = "neve"
    }
    if (cod === "20") {
      inform.icon = "wi-yahoo-20",
        inform.condition = "Neblina",
        inform.image = "nuvem"
    }
    if (cod === "21") {
      inform.icon = "wi-yahoo-21",
        inform.condition = "Névoa Seca",
        inform.image = "nuvem"
    }
    if (cod === "22") {
      inform.icon = "wi-yahoo-22",
        inform.condition = "Enfumaçado",
        inform.image = "nuvem"
    }
    if (cod === "23") {
      inform.icon = "wi-yahoo-23",
        inform.condition = "Vendaval",
        inform.image = "nuvem"
    }
    if (cod === "24") {
      inform.icon = "wi-yahoo-24",
        inform.condition = "Ventando",
        inform.image = "nuvem"
    }
    if (cod === "25") {
      inform.icon = "wi-yahoo-25",
        inform.condition = "Frio",
        inform.image = "neve"
    }
    if (cod === "26") {
      inform.icon = "wi-yahoo-26",
        inform.condition = "Nublado",
        inform.image = "nuvem"
    }
    if (cod === "27") {
        inform.icon = "wi-yahoo-27",
        inform.condition = "Muitas Nuvens",
        inform.image = "nuvem"
    }
    if (cod === "28") {
        inform.icon = "wi-yahoo-28",
        inform.condition = "Muitas Nuvens",
        inform.image = "nuvem"
    }
    if (cod === "29") {
        inform.icon = "wi-yahoo-29",
        inform.condition = "Parcialmente Nublado",
        inform.image = "nuvem"
    }
    if (cod === "30") {
        inform.icon = "wi-yahoo-30",
        inform.condition = "Parcialmente Nublado",
        inform.image = "nuvem"
    }
    if (cod === "31") {
        inform.icon = "wi-yahoo-31",
        inform.condition = "Céu Limpo",
        inform.image = "sol"
    }
    if (cod === "32") {
        inform.icon = "wi-yahoo-32",
        inform.condition = "Ensolarado",
        inform.image = "sol"
    }
    if (cod === "33") {
        inform.icon = "wi-yahoo-33",
        inform.condition = "Tempo Bom",
        inform.image = "sol"
    }
    if (cod === "34") {
        inform.icon = "wi-yahoo-34",
        inform.condition = "Tempo Bom",
        inform.image = "sol"
    }
    if (cod === "35") {
        inform.icon = "wi-yahoo-35",
        inform.condition = "Chuva e Granizo",
        inform.image = "chuva"
    }
    if (cod === "36") {
        inform.icon = "wi-yahoo-36",
        inform.condition = "Quente",
        inform.image = "sol"
    }
    if (cod === "37") {
        inform.icon = "wi-yahoo-37",
        inform.condition = "Tempestades Isoladas",
        inform.image = "chuva"
    }
    if (cod === "38") {
        inform.icon = "wi-yahoo-38",
        inform.condition = "Tempestades Esparsas",
        inform.image = "chuva"
    }
    if (cod === "39") {
        inform.icon = "wi-yahoo-39",
        inform.condition = "Tempestades Esparsas",
        inform.image = "chuva"
    }
    if (cod === "40") {
        inform.icon = "wi-yahoo-40",
        inform.condition = "Chuvas Esparsas",
        inform.image = "chuva"
    }
    if (cod === "41") {
        inform.icon = "wi-yahoo-41",
        inform.condition = "Nevascas",
        inform.image = "neve"
    }
    if (cod === "42") {
        inform.icon = "wi-yahoo-42",
        inform.condition = "Tempestades de Neve Esparsas",
        inform.image = "neve"
    }
    if (cod === "43") {
        inform.icon = "wi-yahoo-43",
        inform.condition = "Nevasca",
        inform.image = "neve"
    }
    if (cod === "44") {
        inform.icon = "wi-yahoo-44",
        inform.condition = "Parcialmente Nublado",
        inform.image = "nuvem"
    }
    if (cod === "45") {
        inform.icon = "wi-yahoo-45",
        inform.condition = "Chuva com Trovoadas",
        inform.image = "raio"
    }
    if (cod === "46") {
      inform.icon = "wi-yahoo-46",
        inform.condition = "Tempestade com Neve",
        inform.image = "neve"
    }
    if (cod === "47") {
        inform.icon = "wi-yahoo-47",
        inform.condition = "Relâmpagos e chuvas isoladas",
        inform.image = "raio"
    }
    if (cod === "48") {
        inform.icon = "wi-yahoo-3200",
        inform.condition = "Não Disponível",
        inform.image = "sol"
    }
    return inform

  }

})


.directive('locationOrigem', function($ionicModal, LocationService) {
  return {
    restrict: 'A',
    scope: {
      origem: '=',
    },
    link: function($scope, element) {

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
          $scope.origem = place.description

          //
          // LocationService.getDetails(place.place_id).then(function(location) {
          //   $scope.location;
          $scope.close();
          // });
        };
      });
    }
  }
})

.directive('locationDestino', function($ionicModal, LocationService) {
  return {
    restrict: 'A',
    scope: {
      destino: '=',
    },
    link: function($scope, element) {

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
          $scope.destino = place.description
          $scope.close();
        };
      });
    }
  }
})
