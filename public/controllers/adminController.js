
app.controller('adminController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
    function ($scope, $http, $routeParams, $location, $rootScope) {
        $scope.orderOfInterest = {};

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

        $scope.deleteOrder = function (order) {
            console.log(order);

            $http.delete("/api/orders/" + order._id).then(function () {
                $scope.orders = $scope.orders.filter(function(o) { return o._id !== order._id});
            })
        };

        $scope.deliverCookies = function (order) {
            order.delivered = true;
            console.log(order);
            $http.put("api/orders/" + order._id, order).then(function () {
            });
        };

        $scope.updateOrderOfInterest = function (o) {
            $scope.orderOfInterest = o;
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
