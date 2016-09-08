// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngResource', 'ionic-material',
  'ionMdInput', 'ngMap', 'ds.clock', 'base64', 'jett.ionic.filter.bar', 'ng-mfb',
  'ngStorage','firebase'])

//.constant('URL', '384077b5.ngrok.io')
 .constant('URL', 'whtapp.herokuapp.com')

.run(function($ionicPlatform, $state, $cordovaPushV5, $rootScope, $localStorage,$interval) {

  if ($localStorage.user === undefined) {
    $localStorage.islogged = false;
    console.log('not logged');
  } else {
    $localStorage.islogged = true;
    console.log('logged');
  }
  $ionicPlatform.ready(function() {

    $interval(
       function(){
         cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
           $rootScope.gps = enabled;
           console.log(JSON.stringify($rootScope.gps));
           console.log("Location setting is " + (enabled ? "enabled" : "disabled"));

         }, function(error) {
           console.error("The following error occurred: " + error);
         });
       }, 30000);

    cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
      $rootScope.gps = enabled;
      console.log("Location setting is " + (enabled ? "enabled" : "disabled"));

    }, function(error) {
      console.error("The following error occurred: " + error);
    });


    cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
        $rootScope.gps = enabled;
      console.log("Location setting is " + (enabled ? "enabled" : "disabled"));

    }, function(error) {
      console.error("The following error occurred: " + error);
    });



    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }





    //Instala Aqui
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function(jsonData) {
      console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal.init("33f83558-152d-471b-9e81-ee80286447e6", {
        googleProjectNumber: "10441341577"
      },
      notificationOpenedCallback);

    // Show an alert box if a notification comes in when the user is in your app.
    window.plugins.OneSignal.enableInAppAlertNotification(true);



    var options = {
      android: {
        senderID: "10441341577"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    };

    // initialize
    $cordovaPushV5.initialize(options).then(function() {
      // start listening for new notifications
      $cordovaPushV5.onNotification();
      // start listening for errors
      $cordovaPushV5.onError();

      // register to get registrationId
      $cordovaPushV5.register().then(function(data) {
        // `data.registrationId` save it somewhere;
        data.registrationId
      })


    });





    // triggered every time notification received
    $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
    });

    // triggered every time error occurs
    $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e) {
      // e.message
    });



  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.backButton.icon('ion-android-arrow-back');
  $ionicConfigProvider.backButton.text('');

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'PerfilCtrl'
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'loginSocialCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })
    .state('app.gps', {
      url: '/userinform',
      views: {
        'menuContent': {
          templateUrl: 'templates/UserInform.html',
          controller: 'UserInformCtrl'
        }
      }
    })
    .state('app.informSituation', {
      url: '/gpsoauthSituation',
      views: {
        'menuContent': {
          templateUrl: 'templates/userInformSituationCity.html',
          controller: 'UserInformCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })
    .state('app.perfil', {
      url: '/perfil',
      views: {
        'menuContent': {
          templateUrl: 'templates/perfil.html',
          controller: 'PerfilCtrl'
        }
      }
    })
    .state('app.products', {
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'templates/products.html',
          controller: 'PerfilCtrl'
        }
      }
    })
    .state('app.rules', {
      url: '/rules',
      views: {
        'menuContent': {
          templateUrl: 'templates/rules.html',
          controller: 'PerfilCtrl'
        }
      }
    })
    .state('app.config', {
      url: '/config',
      views: {
        'menuContent': {
          templateUrl: 'templates/config.html',
          controller: 'PerfilCtrl'
        }
      }
    })
    .state('app.wallet', {
      url: '/wallet',
      views: {
        'menuContent': {
          templateUrl: 'templates/wallet.html',
          controller: 'PerfilCtrl'
        }
      }
    })
    .state('app.localization', {
      url: '/localization',
      views: {
        'menuContent': {
          templateUrl: 'templates/localization.html',
          controller: 'localizationCtrl'
        }
      }
    })
    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'templates/chats.html',
          controller: 'localizationCtrl'
        }
      }
    })
    .state('app.problemas', {
      url: '/problemas',
      views: {
        'menuContent': {
          templateUrl: 'templates/problemas.html',
          controller: 'problemasCtrl'
        }
      }
    })
    .state('app.addRoutes', {
      url: '/addRoutes',
      views: {
        'menuContent': {
          templateUrl: 'templates/addRoutes.html',
          controller: 'localizationCtrl'
        }
      }
    })
    .state('app.favoritePlaces', {
      url: '/favoritePlaces',
      views: {
        'menuContent': {
          templateUrl: 'templates/favoritePlaces.html',
          controller: 'favoritePlacesCtrl'
        }
      }
    })
    .state('app.register', {
      url: '/registerEmail',
      views: {
        'menuContent': {
          templateUrl: 'templates/registerEmail.html',
          controller: 'registerEmailCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })
    .state('app.gpsoauth', {
      url: '/gpsoauthSituation',
      views: {
        'menuContent': {
          templateUrl: 'templates/situationCity.html',
          controller: 'gpsOauthCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })
    .state('app.finishedLogin', {
      url: '/finishedLogin',
      views: {
        'menuContent': {
          templateUrl: 'templates/finishedLogin.html',
          controller: 'finishedLogin'
        }
      }
    })

  // Reset Send = Enviar a chave
  .state('app.resetsend', {
      url: '/resetsend',
      views: {
        'menuContent': {
          templateUrl: 'templates/resetSend.html',
          controller: 'ResetPasswordCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })
    // Reset Edit = Editar a senha depois de confirmada a chave
    .state('app.resetedit', {
      url: '/resetedit',
      views: {
        'menuContent': {
          templateUrl: 'templates/resetEdit.html',
          controller: 'ResetPasswordEditCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })

    // Reset Key Enter = Entrar com a chave para confirmação
    .state('app.resetkeyenter', {
      url: '/resetkeyenter',
      views: {
        'menuContent': {
          templateUrl: 'templates/resetKeyEnter.html',
          controller: 'ResetPasswordKeyEnterCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    });
  $urlRouterProvider.otherwise("app/login");
})

.controller("MainController", ['$scope', '$ionicSideMenuDelegate', '$timeout',
  '$state', '$localStorage', '$rootScope',
  function($scope, $timeout, $ionicSideMenuDelegate, $state, $localStorage, $rootScope) {




    $scope.user = $localStorage.user

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.backprincipal = function() {
      $state.go("app.localization")
    }



    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.doRefresh = function() {
      console.log('Refreshing!');

      $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
      $scope.$broadcast('scroll.refreshComplete');
    };



    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
      navIcons.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }

    // Layout Methods



    $scope.showNavBar = function() {
      // document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }
    };

    $scope.setExpanded = function(bool) {
      $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
      var hasHeaderFabLeft = false;
      var hasHeaderFabRight = false;

      switch (location) {
        case 'left':
          hasHeaderFabLeft = true;
          break;
        case 'right':
          hasHeaderFabRight = true;
          break;
      }

      $scope.hasHeaderFabLeft = hasHeaderFabLeft;
      $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (!content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }

    };


    $scope.showHeader = function() {
      $scope.showNavBar();
      $scope.hasHeader();
    };

    $scope.clearFabs = function() {
      var fabs = document.getElementsByClassName('button-fab');
      if (fabs.length && fabs.length > 1) {
        fabs[0].remove();
      }
    };

    // Form data for the login modal
    $scope.loginData = {};

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };

    var defaultPageSize = 6;

    $scope.currentPage = 1;
    $scope.pageSize = $scope.currentPage * defaultPageSize;

    $scope.loadNextPage = function() {
      $scope.currentPage++;
      $scope.pageSize = $scope.currentPage * defaultPageSize;
    }
  }
])

.service('LocationService', function($q) {
  var autocompleteService = new google.maps.places.AutocompleteService();
  var detailsService = new google.maps.places.PlacesService(document.createElement("input"));
  return {
    searchAddress: function(input) {
      var deferred = $q.defer();

      autocompleteService.getPlacePredictions({
        input: input
      }, function(result, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log(status);
          deferred.resolve(result);
        } else {
          deferred.reject(status)
        }
      });

      return deferred.promise;
    },
    getDetails: function(placeId) {
      var deferred = $q.defer();
      detailsService.getDetails({
        placeId: placeId
      }, function(result) {
        deferred.resolve(result);
      });
      return deferred.promise;
    }
  };
})
