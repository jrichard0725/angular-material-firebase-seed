var webApp = angular.module('main', ['ngMaterial']);


webApp.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $mdDialog){
    $scope.alert = '';
    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };

    $scope.showLoginDailog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/login-dailog-temp.html',
            targetEvent: ev
        })
        .then(function(answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
        });
    };
});

webApp.controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
        $scope.close = function() {
            $mdSidenav('left').close();
        };
});

function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}