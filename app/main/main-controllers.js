'use strict';

/* Controllers */

var mainController = angular.module('coreApp.controllers', ['ngMaterial', 'firebase.utils', 'userFactories', 'firebase'])
  .controller('AppCtrl',['$scope', '$timeout', '$mdSidenav', '$mdDialog','userFactories','fbutil', 'authUserFactory', function($scope, $timeout, $mdSidenav, $mdDialog, userFactories, fbutil, authUserFactory){
    this.user = userFactories.user;
    this.alert = '';
    this.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };

    this.showLoginDailog = function(ev) {
      console.log('from sign in buton!');
      $mdDialog.show({
        templateUrl: 'app/user/login.html',
        targetEvent: ev
      })
          .then(function(userData) {
            $scope.alert = 'You are successfuly signed in with "' + userData.provider + '".';


          }, function() {
            $scope.alert = 'You cancelled the dialog.';
          });
    };
      this.signOut = function(){
        userFactories.logout();
      };




  }])

  .controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
    this.close = function() {
      $mdSidenav('left').close();
    };
  });

