var app = angular.module('myApp', ['ngRoute'])
.run(['$rootScope', function($rootScope) {
  $rootScope.login = false;
}]);

app.run(function($rootScope) {
    $rootScope.currentOrder = {};
});


app.config(function ($routeProvider) {
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin').success(function(user){
            // Authenticated
            if (user !== '0') {
                deferred.resolve();
            }
            // Not Authenticated
            else {
                $rootScope.message = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        }).error(function(){
          deferred.reject();
          $location.url('/login');
        });

        return deferred.promise;
    };
    var checkOwner = function($q, $timeout, $http, $location, $rootScope){
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin').success(function(user){
            // Authenticated
            if (user !== '0' && user.role === 'Owner') {
                deferred.resolve(true);
            }
            // Not Authenticated
            else {
                $rootScope.message = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        }).error(function(){
          deferred.reject();
          $location.url('/login');
        });

        return deferred.promise;
    };
    $routeProvider
  .when('/', {
    templateUrl: '/views/order.html',
    controller: 'mainController',
  })
  .when('/order', {
    templateUrl: '/views/order.html',
    controller: 'mainController',
  })
  .when('/team', {
    templateUrl: '/views/team.html',
    controller: 'mainController',
  })
  .when('/contact', {
    templateUrl: '/views/contact.html',
    controller: 'mainController'
  })
  .when('/login', {
    templateUrl: '/views/signin.html',
    controller: 'mainController'
  })
  .when('/signup', {
    templateUrl: '/views/signup.html',
    controller: 'mainController',
    resolve: {
      loggedin : checkOwner
    }
  })
  .when('/checkout/:cc/:dc/:sd/:om', {
    templateUrl: '/views/checkout.html',
    controller: 'mainController'
  })
  .when('/confirmation/:oid', {
    templateUrl: '/views/confirmation.html',
    controller: 'mainController'
  })
  .when('/admin', {
    templateUrl: '/views/admin.html',
    controller: 'mainController',
      resolve: {
        loggedin : checkLoggedin
      }
  })
  .when('/owner', {
    templateUrl: '/views/owner.html',
    controller: 'mainController',
      resolve: {
          loggedin : checkOwner
      }
  })
  .when('/logout', {
      templateUrl: '/views/logout.html',
        controller: 'logoutController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
