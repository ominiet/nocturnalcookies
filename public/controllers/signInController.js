app.controller('signInController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
    function ($scope, $http, $routeParams, $location, $rootScope) {

        $scope.signIn = function (user) {
            $http.post('api/users/login', user).then(function (response) {
                if (response.status === 200) $location.url('/admin');
                else $location.url('/login');
            });
        };
    }]);
