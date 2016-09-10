(function() {
    'use strict';

    angular.module('myApp', [])
        .controller('LunchCheckController', LunchCheckController);

        LunchCheckController.$inject = ['$scope'];

        function LunchCheckController($scope) {
            $scope.lunchItems = '';
            $scope.message = '';

            $scope.checkLunchItems = function() {
                var trimmed = $scope.lunchItems.trim();

                if(trimmed.length === 0) {
                    $scope.message = 'Please enter data first.';
                } else if(trimmed.split(',').length <= 3) {
                    $scope.message = 'Enjoy!';
                } else {
                    $scope.message = 'Too much!';
                }
            }

            $scope.clearLunchItems = function() {
                $scope.lunchItems = '';
                $scope.message = '';
            }
        }
})();