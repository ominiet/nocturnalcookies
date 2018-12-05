
app.controller('mainController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
    function ($scope, $http, $routeParams, $location, $rootScope) {
        $scope.orderOfInterest = {};
        $scope.newOrder = {};

        if($routeParams.oid)
        {
          $http.get('/api/orders/' + $routeParams.oid).then(function(response) {
            $scope.currentOrder = response.data;
          });
        } else if($routeParams.cc || $routeParams.dc || $routeParams.sd || $routeParams.om) {
          $scope.newOrder.cc = parseInt($routeParams.cc);
          $scope.newOrder.dc = parseInt($routeParams.dc);
          $scope.newOrder.sd = parseInt($routeParams.sd);
          $scope.newOrder.om = parseInt($routeParams.om);
        }

        $http.get('/loggedin').success(function (response) {
            if (response.role === "Owner") {
                $rootScope.isOwner =true;
            }
            $rootScope.login = true;
        }).error(function (response) {
            $rootScope.isOwner = false;
            $rootScope.login = false;
        });


        $http.get('api/orders').then(function (response) {
            $scope.orders = response.data;

        }, function (error) {
            console.log('Could not get orders', error);
        });

        $http.get('api/users').then(function (response) {
            $scope.users = response.data;
        }, function (error) {
            console.log('Could not get users', error);
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

        $scope.checkout = function () {

            if($scope.cc === undefined) $scope.cc = 0;
            if($scope.dc === undefined) $scope.dc = 0;
            if($scope.sd === undefined) $scope.sd = 0;
            if($scope.om === undefined) $scope.om = 0;



            $location.path('/checkout/'+ $scope.cc +'/'+ $scope.dc +'/'+ $scope.sd +'/'+ $scope.om);
        };

        $scope.signIn = function (user) {
            $http.post('api/users/login', user).then(function (response) {
                if (response.status === 200) $location.url('/admin');
                else $location.url('/login');
            });
        };
        //TODO: make so you dont have to reload the page
        $scope.deleteOrder = function (order) {
            console.log(order);

            $http.delete("/api/orders/" + order._id).then(function () {
              $scope.orders = $scope.orders.filter(function(o) { return o._id != order._id});
            })
        };
        $scope.deleteUser = function (user) {
            console.log(user);

            $http.delete("/api/users/" + user._id).then(function () {
              $scope.users = $scope.users.filter(function(u) { return u._id != user._id});
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
            $http.post("api/orders/", order).then(function (response) {
                $location.url('/confirmation/' + response.data._id);

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
