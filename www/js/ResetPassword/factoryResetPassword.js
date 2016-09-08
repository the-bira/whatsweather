var app = angular.module('starter')

.factory('factoryResetPassword', function($resource,URL) {
  return $resource("http://"+URL+"/password_reset/create")
})

.factory('factoryResetPasswordKeyEnter', function($resource,URL) {
  return $resource("http://"+URL+"/password_reset/:key/edit")
})

.factory('factoryResetPasswordEdit', function($resource,URL) {
  return $resource("http://"+URL+"/password_reset/:key", {}, {
      'update': { method:'PATCH',
                  params:{  key:'@key' }
      }

  })
})
