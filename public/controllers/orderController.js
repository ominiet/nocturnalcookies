
app.controller('orderController', ['$scope', '$http', '$routeParams', '$location', '$rootScope',
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

        $scope.checkout = function () {

            if($scope.cc === undefined) $scope.cc = 0;
            if($scope.dc === undefined) $scope.dc = 0;
            if($scope.sd === undefined) $scope.sd = 0;
            if($scope.om === undefined) $scope.om = 0;

            $location.path('/checkout/'+ $scope.cc +'/'+ $scope.dc +'/'+ $scope.sd +'/'+ $scope.om);
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
