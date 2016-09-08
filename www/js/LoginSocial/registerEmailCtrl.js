angular.module('starter')

.controller('registerEmailCtrl', function(factoryRegister, serviceLogin,
  factoryLogin, factoryRegisterTwitter, factoryLoginTwitter,
  $ionicPopup, $scope, $state, $stateParams, $rootScope,
  $timeout, ionicMaterialMotion, ionicMaterialInk, $localStorage,
  factoryUpdateMoney, $cordovaCamera, $cordovaImagePicker, $ionicLoading) {

  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  $scope.userregister = {}

  // Set Motion
  $timeout(function() {
    ionicMaterialMotion.slideUp({
      selector: '.slide-up'
    });
  }, 300);

  $timeout(function() {
    ionicMaterialMotion.fadeSlideInRight({
      startVelocity: 3000
    });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();


  $scope.click = function() {


    function setOptions(srcType) {
      var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true //Corrects Android orientation quirks
      }
      return options;
    }

    function createNewFileEntry(imgUri) {
      window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", {
          create: true,
          exclusive: false
        }, function(fileEntry) {

          // Do something with it, like write to it, upload it, etc.
          // writeFile(fileEntry, imgUri);
          console.log("got file: " + fileEntry.fullPath);
          // displayFileData(fileEntry.fullPath, "File copied to");
        }, onErrorCreateFile);

      }, onErrorResolveUrl);
    }


    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = createNewFileEntry;


    $ionicLoading.show({
      template: 'Loading...'
    })

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
      $scope.userregister.image_profile = imageUri
    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);

    $timeout(function() {
      $ionicLoading.hide()
    }, 1000)
  }

  $scope.registerEmail = function(user) {
    var userregister = {
      name: user.name,
      email: user.email,
      idRedeSocial: "",
      password: user.password,
      password_confirmation: user.password_confirmation,
      we_money: 0,
      image_profile: user.image_profile
    };
    factoryRegister.save(userregister, function() {

      $state.go('app.login');
      $ionicPopup.alert({
        title: 'Cadastro Realizado ',
        template: 'Por favor tente novamente o login com suas informações. Como boas vindas você recebe 50 WeMoney'
      });
      user.value = 50;
      user.escope = "register"
      factoryUpdateMoney.save(user);

    }, function() {
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Ocorreu uma falha'
      });
    });

  }


})
