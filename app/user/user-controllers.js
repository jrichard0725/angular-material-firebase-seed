var userController = angular.module('user.controllers', ['ngMaterial', 'firebase.utils', 'userFactories', 'firebase'])

    .controller('loginDialogCtrl', ['$scope', '$firebaseAuth', '$mdDialog','FBURL', 'userFactories', 'fbutil', function($scope, $firebaseAuth, $mdDialog, FBURL, userFactories, fbutil) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;
        $scope.dataFromFirebase = fbutil.syncObject('data');


        $scope.oauthLogin = function (provider) {
           userFactories.oauthLogin(provider).then(function(authData){
               $mdDialog.hide(authData);
           }).catch(function(error){
               console.log(error);
           });

        };



        $scope.login = function (email, pass) {
            userFactories.login(email, pass);
            var checkvalue = userFactories.getUser();
            console.log(checkvalue);

            if (user) {
                $mdDialog.cancel();
            }
            else {
                console.log('There is some problom with your simple login!');
            }
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
]);
