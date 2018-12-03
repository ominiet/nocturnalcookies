angular.module('listings').controller('mainController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
    function ($scope, $http, $routeParams, $location, loggedin, $rootScope) {
        //$rootScope.Scope.defined = false;
        $scope.orderOfInterest = {};

        $http.get('/loggedin').success(function (response) {
            console.log("res: " + response.status);
            $scope.loggedin = true;
            console.log($scope.loggedin);
        }).error(function (response) {
            console.log("res: " + response.status);
            $scope.loggedin = false;
            console.log($scope.loggedin);
        });

        // $scope.newOrder = {};
        // if ($rootScope.defined) {
        //     $scope.newOrder.cc = $rootScope.numdc;
        //
        //     $scope.newOrder.dc = $rootScope.numdc;
        //
        //     $scope.newOrder.sd = $rootScope.numsd;
        //
        //     $scope.newOrder.om = $rootScope.numom;
        // }
        $http.get('http://localhost:8080/api/orders').then(function (response) {
            $scope.orders = response.data;
            //console.log($scope.orders);
        }, function (error) {
            console.log('Could not get orders', error);
        });

        $http.get('http://localhost:8080/api/users').then(function (response) {
            $scope.users = response.data;
            //console.log($scope.users);
        }, function (error) {
            console.log('Could not get users', error);
        });


        $scope.signUp = function (user) {
            console.log('INPUT USER' + user);
            if (user.password !== user.password2) {
                console.log('Passwords do not match');
                return 'Error';
            }
            user.role = 'Employee';
            $http.post('http://localhost:8080/api/users', user).then(function (response) {
                $location.url('/login')
            });
        };
        // $scope.checkout = function () {
        //     console.log("Checkout");
        //     $rootScope.numcc = $scope.cc;
        //     $rootScope.numdc = $scope.dc;
        //     $rootScope.numsd = $scope.sd;
        //     $rootScope.numom = $scope.om;
        //     $rootScope.defined = true;
        //     console.log($rootScope.numcc);
        //     $location.path('/checkout');
        // };

        $scope.signIn = function (user) {
            $http.post('http://localhost:8080/api/users/login', user).then(function (response) {
                if (response.status === 200) $location.url('/admin');
                else $location.url('/login');
            });
        };
        //TODO: make so you dont have to reload the page
        $scope.deleteOrder = function (order) {
            console.log(order);

            $http.delete("/api/orders/" + order._id).then(function () {
            })
        };
        $scope.deleteUser = function (user) {
            console.log(user);

            $http.delete("/api/users/" + user._id).then(function () {
            })
        };

        $scope.deliverCookies = function (order) {
            order.delivered = true;
            console.log(order);
            $http.put("api/orders/" + order._id, order).then(function () {

            });
        };
        $scope.placeOrder = function(order){
          console.log(order);
            $http.post("api/orders/", order).then(function () {
                $location.url("/");
            });
        };

        $scope.calculateCost = function (numcookies) {
            var total = parseInt(numcookies);
            var price = 0;
            if (total > 0 && total <= 2) {
                price = total * 2;
            }
            else if (total >= 3 && total <= 5) {
                price = total * 1.666;
            }
            else if (total >= 6 && total <= 11) {
                price = total * 1.666;
            }
            else if (total > 11 && total <= 17) {
                price = total * 1.50;
            }
            else if (total >= 18 && total <= 23) {
                price = total * 1.44;
            }
            else if (total >= 24) {
                price = total * 1.333;
            }
            return Math.round(price);
        };

        $scope.updateOrderOfInterest = function (o) {
            $scope.orderOfInterest = o;
        };


    }]);