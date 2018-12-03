angular.module('listings', []);

var app = angular.module('myApp', ['ngRoute', 'listings']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'public/order.html',
    controller: 'mainController',
  })
  .when('/order', {
    templateUrl: 'public/order.html',
    controller: 'mainController',
  })
  .when('/team', {
    templateUrl: 'public/team.html',
    controller: 'mainController',
  })
  .when('/contact', {
    templateUrl: 'public/contact.html',
    controller: 'mainController'
  })
  .when('/login', {
    templateUrl: 'public/signin.html',
    controller: 'mainController'
  })
  .when('/signup', {
    templateUrl: 'public/signup.html',
    controller: 'mainController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
