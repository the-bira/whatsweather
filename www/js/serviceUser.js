angular.module('starter')

.service('serviceLogin', function($localStorage) {


  var image_profile = {}

  var setUser = function(name, email, idRedeSocial,image_profile) {


  }

  var setUser_registed = function(user_registed) {

  }

  var setUser_twitter = function(user_registed, email) {

  }

  var set_image_profile = function(image){
    image_profile = image
  }
   var get_image_profile = function(){
     return image_profile;
   }


  var getUser = function() {
  
  }

  return {
    setUser: setUser,
    setUser_twitter: setUser_twitter,
    setUser_registed: setUser_registed,
    getUser: getUser,
    set_image_profile: set_image_profile,
    get_image_profile: get_image_profile
  }
})





.service('serviceResetPassword', function() {

  var user = {}

  var setUser = function(passwordResetKey, password, passwordConfirmation) {
    user.password_reset_key = passwordResetKey
    user.password = password,
    user.password_confirmation = passwordConfirmation
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})
