app.controller('createUserController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
    function ($scope, $http, $routeParams, $location, $rootScope) {
        $http.get('/loggedin').success(function (response) {
            if (response.role === "Owner") {
                $rootScope.isOwner =true;
            }
            $rootScope.login = true;
        }).error(function (response) {
            $rootScope.isOwner = false;
            $rootScope.login = false;
        });

        $scope.signUp = function (user) {
            if (user.password !== user.password2) {
                console.log('Passwords do not match');
                return 'Error';
            }
            user.role = 'Employee';
            $http.post('api/users', user).then(function (response) {
                $location.url('/owner')
            });
        };
    }]);
