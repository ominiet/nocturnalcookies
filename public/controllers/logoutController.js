app.controller('logoutController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
    function ($scope, $http, $routeParams, $location, $rootScope) {

        $http.get('/api/users/logout').then(function(){
            $rootScope.isOwner = false;
            $rootScope.login = false;
            $location.url('/');
        });
    }]);
