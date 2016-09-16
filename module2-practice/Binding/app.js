(function() {
    'use strict';

    angular.module('app', [])
        .controller('BindingController', BindingController);

    function BindingController($scope) {
        $scope.firstName = 'Joseph';
        // $scope.fullName = '';

        $scope.numberOfWatchers = function() {
            console.log('watchers:', $scope.$$watchersCount);
        }

        $scope.setFullName = function() {
            $scope.fullName = $scope.firstName + ' Driscoll';
        }

        $scope.logFirstName = function() {
            console.log($scope.firstName);
        }

        $scope.logFullName = function() {
            console.log($scope.fullName);
        }
    }
})();