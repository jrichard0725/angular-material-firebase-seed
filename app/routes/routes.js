"use strict";

angular.module('myApp.routes', ['ngRoute', 'userFactories'])

.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/home", {
    // the rest is the same for ui-router and ngRoute...
    controller: "HomeCtrl",
    templateUrl: "app/home/home.html",
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["authUserFactory", function(authUserFactory) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return authUserFactory.$waitForAuth();
      }]
    }
  }).when("/account", {
    // the rest is the same for ui-router and ngRoute...
    controller: "AccountCtrl",
    templateUrl: "app/user/account/account.html",
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["authUserFactory", function(authUserFactory) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return authUserFactory.$requireAuth();
      }]
    }
  })
      .otherwise({redirectTo: '/home'});
}])

.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/home");
      }
    });
  }]);
