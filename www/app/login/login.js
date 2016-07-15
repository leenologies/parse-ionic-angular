angular.module('starter')

.controller('LoginCtrl', function($scope, $log, $state) {
  console.log('I am in the login ctrl');

  $log.debug(Parse.User.current().id, ' hey hey!');

  $scope.registerClick = function() {
    $state.go('register');
  }
});