angular.module('listings').controller('mainController', ['$scope', '$http', '$routeParams', '$location',
  function ($scope, $http, $routeParams, $location) {

    $scope.orderOfInterest = {};

    $http.get('http://localhost:8080/api/orders').then(function(response){
      $scope.orders = response.data;
      console.log($scope.orders);
    }, function(error){
      console.log('Could not get orders', error);
    });

    $http.get('http://localhost:8080/api/users').then(function(response){
      $scope.users = response.data;
      console.log($scope.users);
    }, function(error){
      console.log('Could not get users', error);
    });

    $scope.signUp = function(user){
      console.log('INPUT USER' + user);
      if(user.password !== user.password2)
      {
        console.log('Passwords do not match');
        return 'Error';
      }
      user.role = 'Employee';
      $http.post('http://localhost:8080/api/users', user).then(function(response) {
        console.log(response);
      });
    };

    $scope.calculateCost = function(numcookies) {
      var total = parseInt(numcookies);
      var price = 0;
      if (total > 0 && total <= 2)
        {price = total * 2;}
      else if (total >= 3 && total <= 5)
        {price = total * 1.666;}
      else if (total >= 6 && total <= 11)
        {price = total * 1.666;}
      else if (total > 11 && total <= 17)
        {price = total * 1.50;}
      else if (total >= 18 && total <= 23)
        {price = total * 1.44;}
      else if (total >= 24)
        {price = total * 1.333;}
        return Math.round(price);
    };

    $scope.updateOrderOfInterest = function(o){
      $scope.orderOfInterest = o;
    };




  }]);
