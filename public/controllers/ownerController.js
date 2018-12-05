app.controller('ownerController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
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
        $http.get('api/users').then(function (response) {
            $scope.users = response.data;
        }, function (error) {
            console.log('Could not get users', error);
        });

        $scope.deleteUser = function (user) {
            console.log(user);

            $http.delete("/api/users/" + user._id).then(function () {
                $scope.users = $scope.users.filter(function(u) { return u._id !== user._id});
            })
        };
    }]);
