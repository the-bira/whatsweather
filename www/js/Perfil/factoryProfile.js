var app = angular.module('starter')

.factory("factoryUpdate", function($resource, URL) {
  return $resource("http://" + URL + "/users/update", {}, {
    'update': {
      method: 'PATCH',
      params: {
        email: '@email'
      }
    }
  })
})

.factory("factoryUpdateImage", function($resource, URL) {
  return $resource("https://" + URL + "/users/update_profile_image")
})


.factory("factoryDebit", function($resource, URL) {
  return $resource("https://" + URL + "/users/debit")
})

.factory("factoryCurrentUser", function($resource, URL) {
  return $resource("http://" + URL + "/users/current_user")
})

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
// attrs.$observe('ngSrc', function(value) {
//   if (!value && attrs.errSrc) {
//     attrs.$set('src', attrs.errSrc);
//   }
// });
