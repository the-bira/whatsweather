angular.module('starter')

.controller('PerfilCtrl', function(factoryRegister,
  searchFactory, serviceLogin, factoryLoginTwitter, $ionicPopup,
  $scope, $state, $ionicModal, $cordovaCamera, $cordovaImagePicker,
  factoryUpdate, factorySendEmailProduct, $ionicLoading, $timeout,
  factoryUpdateImage, $localStorage, factoryDebit,
  factoryCurrentUser, $rootScope) {


  $rootScope.user = $localStorage.user;
  $scope.gps = $rootScope.gps

$scope.click =function(gps){
    if ($rootScope.gps === true) {
      alert("SERF");
    } else {
      cordova.plugins.locationAccuracy.request(function(success) {
        console.log("Successfully requested accuracy: " + success.message);
      }, function(error) {
        console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
          if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
            cordova.plugins.diagnostic.switchToLocationSettings();
          }
        }
      }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }
}

$scope.$watch('$localStorage.user', function() {
    // console.log( JSON.stringify($localStorage.user.user_logs));
    $rootScope.user = $localStorage.user;
    console.log($scope.gpslog);
  });

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.backprincipal = function() {
    $state.go("app.localization")
  }


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
    // serviceLogin.getUser();

  console.log($scope.user);
  console.log($scope.editUser);

  $scope.alterarFoto = function() {

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

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

      $ionicLoading.show({
        template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
      });


      $timeout(function() {


        $ionicLoading.hide();
        serviceLogin.set_image_profile(imageUri)
        $scope.$apply();


        factoryUpdateImage.save({
          email: serviceLogin.getUser().email,
          image: imageUri
        });
      }, 1000)


    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);


  }


  $scope.updateProfile = function(user) {
    factoryUpdate.update({
      email: serviceLogin.getUser().email
    }, {
      user: user
    }, function(user) {

      console.log(user);
    }, function(error) {
      alert("erro", error.message);
    });
  }



  $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];
  $scope.openModal = function(animation) {
    $ionicModal.fromTemplateUrl('templates/searchSelect.html', {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };



//Listando os produtos -- Como não tem cadastro de produtos
  $scope.products = [{
      name: "LORD 79 - Licor fino de Ouro",
      img: 'img/products/imagem_produto1.jpg',
      description: "Cachaça, mel, limão e flocos de ouro",
      prevalue: 99,
      posvalue: 89,
      wemoney: 290
    }
    //  , {
    //   name: "Bebida de Prata",
    //   img: "img/ionic.png",
    //   description: "Cachaça, mel, limão e flocos de prata",
    //   prevalue: 140,
    //   posvalue: 90,
    //   wemoney: 240
    // }
  ]



  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  })

  function onSuccess(DATA_URL) {
    $scope.user.image_profile = DATA_URL;
    console.log(DATA_URL);
    $scope.$apply()
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }

$scope.seeProduct = function(product){
    console.log(product);
    $rootScope.productSelected = product;
    $state.go('app.rules');
}

$scope.sendBuy = function(product) {
    console.log($scope.user);

    if (product.wemoney > $scope.user.we_money) {
      var alertPopup = $ionicPopup.alert({
        title: 'Sem WeMoney',
        template: 'Você não tem WeMonye para trocar'
      });
      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    } else {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmar',
        template: 'Você confirma troca de seus pontos?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          factorySendEmailProduct.save({
            name: $scope.user.name,
            email: $scope.user.email,
            product_name: product.name,
            product_value: product.wemoney
          }, function(user) {
            // console.log(user);
          })

          factoryDebit.save({
            email: $scope.user.email,
            value: product.wemoney
          }, function(user) {
            console.log(user);
            $rootScope.usernew = user;
            $localStorage.user = user;
            $state.go('app.localization');
            var alertPopup = $ionicPopup.alert({
              title: 'Troca de WeMoney',
              template: 'Muito obrigado !! Nós entraremos em contato com você.'
            });

          })

        } else {

        }

        console.log($rootScope.usernew);
      });
    }
  }


  $scope.selImages = function() {

    var options = {
      maximumImagesCount: 10,
      width: 800,
      height: 800,
      quality: 80
    };

    var cameraPopoverHandle = navigator.camera.getPicture(onSuccess, onFail, {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
    });

    // Reposition the popover if the orientation changes.
    window.onorientationchange = function() {
      var cameraPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
      cameraPopoverHandle.setPosition(cameraPopoverOptions);
    }


  }


  $scope.updateProfile = function(user) {
    factoryUpdate.update({
      email: serviceLogin.getUser().email
    }, {
      user: user
    }, function(user) {
      alert("atualizado");
      console.log(user);
    }, function(error) {
      alert("erro", error.message);
    });
  }
})


.directive('ionSearchSelect', ['$ionicModal', '$ionicGesture', function($ionicModal, $ionicGesture) {
  return {
    restrict: 'E',
    scope: {
      options: "=",
      optionSelected: "="
    },
    controller: function($scope, $element, $attrs) {
      $scope.searchSelect = {
        title: $attrs.title || "Search",
        keyProperty: $attrs.keyProperty,
        valueProperty: $attrs.valueProperty,
        templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
        animation: $attrs.animation || 'slide-in-up',
        option: null,
        searchvalue: "",
        enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
      };

      $ionicGesture.on('tap', function(e) {

        if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
          if ($scope.optionSelected) {
            $scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
          }
        } else {
          $scope.searchSelect.option = $scope.optionSelected;
        }
        $scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
      }, $element);

      $scope.saveOption = function() {
        if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
          for (var i = 0; i < $scope.options.length; i++) {
            var currentOption = $scope.options[i];
            if (currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
              $scope.optionSelected = currentOption;
              break;
            }
          }
        } else {
          $scope.optionSelected = $scope.searchSelect.option;
        }
        $scope.searchSelect.searchvalue = "";
        $scope.modal.remove();
      };

      $scope.clearSearch = function() {
        $scope.searchSelect.searchvalue = "";
      };

      $scope.closeModal = function() {
        $scope.modal.remove();
      };
      $scope.$on('$destroy', function() {
        if ($scope.modal) {
          $scope.modal.remove();
        }
      });

      $scope.OpenModalFromTemplate = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: $scope.searchSelect.animation
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
    }
  };
}])
