userController.controller('AccountCtrl', ['$scope', 'currentAuth', function($scope, currentAuth){
    $scope.text = 'This text is from Ccontroller';
    console.log(currentAuth);
}]);