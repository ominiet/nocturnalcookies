app.controller('logoutController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
    function ($scope, $http, $routeParams, $location, loggedin, $rootScope) {

        $http.get('/api/users/logout').then(function(){
            $location.url('/');
        });
    }]);
