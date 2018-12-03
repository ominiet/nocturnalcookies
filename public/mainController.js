angular.module('listings').controller('mainController', ['$scope', '$http', '$routeParams', '$location',
  function ($scope, $http, $routeParams, $location) {

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


    $scope.signIn = function(user){
          console.log('INPUT USER ' + user);

          $http.post('http://localhost:8080/api/users/login', user).then(function(response) {
              console.log(response);
          });
      };

  }]);
