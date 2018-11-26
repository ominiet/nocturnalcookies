var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope) {
    $scope.greeting = 'Hello World!';
}]);