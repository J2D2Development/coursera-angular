(function () {
    'use strict';

    angular.module('app', [])
        .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];

    function CounterController($scope) {
        $scope.onceCounter = 0;
        $scope.name = 'Joseph';

        $scope.showNumberOfWatchers = function() {
            console.log('num watchers:', $scope.$$watchersCount);
        }

        $scope.countOnce = function() {
            $scope.onceCounter += 1;
        }

        // $scope.$watch(function() {
        //     console.log('digest loop fired');
        // });
    }
})();