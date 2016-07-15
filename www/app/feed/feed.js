angular.module('starter')

.controller('FeedCtrl', function($scope, $log, $state) {
  console.log('I am in the feed ctrl');

})

.controller('FeedNewCtrl', function($scope, $log, $state, $ionicPopup, $timeout) {
  console.log('I am in the feedNew ctrl');

  angular.extend($scope, {
    data: {
      feed: []
    }
  });

  $scope.uploadFeed = function(_title) {
    $log.debug('UPLOAD FEED!');

    // Parse.GeoPoint.current({
    //   saveFeed,
    //   error: function(err) {
    //     $log.error(JSON.stringify(err));
    //   }
    // });

    // function saveFeed(_geoPoint) {
      new Parse.Object('Feed')
      .save({
        title: _title,
        geoPoint: new Parse.GeoPoint(39, 79),
        uploader: Parse.User.current()
      }).then(function(newFeed) {
        $scope.data.feed.push(newFeed);
        $timeout();
      });
    };

})

.controller('FeedListCtrl', function($scope, $log, $state, $timeout) {
  angular.extend($scope, {
    data: {
      feed: []
    }
  })
  console.log('I am in the feedList ctrl');

  new Parse.Query('Feed')
  .descending('createdAt')
  .include('uploader')
  .include('uploader.nestedPointer')
  .find().then(function(feed) {
    $scope.data.feed = feed;
    $log.debug(JSON.stringify(feed));
    $timeout(); //$scope.$apply();
  }, function(err) {
  });
})


.directive('feedNew', function() {
   return {
    templateUrl: 'app/feed/feednew.html',
    controller: 'FeedNewCtrl',
    scope: false
  };
})

.directive('feedList', function() {
   return {
    templateUrl: 'app/feed/feedlist.html',
    controller: 'FeedListCtrl',
    scope: false
  };
})