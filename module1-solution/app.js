(function() {
    'use strict';

    angular.module('myApp', ['ngAnimate'])
        .controller('LunchCheckController', LunchCheckController);

        LunchCheckController.$inject = ['$scope'];
        function LunchCheckController($scope) {
            $scope.lunchItems = '';
            $scope.message = '';
            $scope.resultClass = '';

            $scope.checkLunchItems = function() {
                var trimmed = $scope.lunchItems.trim();

                if(trimmed.length === 0) {
                    showMessage('Please enter data first.', 'error');
                } else if(trimmed.split(',').length <= 3 || checkForLastIndexEmpty(trimmed)) {
                    showMessage('Enjoy!', 'success');
                } else {
                    showMessage('Too much!', 'fail');
                }
            }

            $scope.clearLunchItemsAndMessage = function() {
                clearItems();
                clearMessage();
            }

            $scope.clearError = function() {
                if($scope.resultClass === 'error') clearMessage();
            }

            //if user enters 3 items, but ends str with comma, fails length check.  make another check with this function to fix
            function checkForLastIndexEmpty(str) {
                var arr = str.split(',');
                return arr.length === 4 && arr[arr.length - 1] === '';
            }

            function showMessage(msg, msgClass) {
                $scope.message = msg;
                $scope.resultClass = msgClass;
            }

            function clearMessage() {
                $scope.message = '';
                $scope.resultClass = '';
            }

            function clearItems() {
                $scope.lunchItems = '';
            }
        }
})();