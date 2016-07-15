angular.module('starter')

.controller('RegisterCtrl', function($scope, $log) {
  angular.extend($scope, {
    data: {}
  });

  $scope.register = function(username, password) {
    $log.debug(username, password);
    Parse.User.signUp(username, password)
    .then(function(newUser) {
      $log.debug(newUser.id, 'has registered!');
      alert('I HAVE REGISTERED!');
    }, function(err) {
      $log.error(JSON.stringify(err));
    });
  }
});