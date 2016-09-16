(function() {
    'use strict';

    angular.module('app', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];

    function CounterController($scope, $timeout) {
        $scope.count = 0;

        $scope.increaseCount = function() {
            $timeout(function() {
                $scope.count += 1;
                console.log('count is now:', $scope.count);
            }, 2000);
        }

        // $scope.increaseCount = function() {
        //     setTimeout(function() {
        //         $scope.$apply(function() {
        //             $scope.count += 1;
        //         });
        //         console.log('counter fired');
        //     }, 2000);
        // }

        // $scope.increaseCount = function() {
        //     setTimeout(function() {
        //         $scope.count += 1;
        //         console.log('increased count!');
        //         $scope.$digest();
        //     }, 2000);
        // }
    }
})();