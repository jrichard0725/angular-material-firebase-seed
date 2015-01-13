mainController.controller('HomeCtrl', ['$scope', 'fbutil', 'currentAuth', function($scope, fbutil, currentAuth) {
    $scope.syncedValue = fbutil.syncObject('syncedValue');
    //$scope.user = user;
    console.log(currentAuth);

}]);

