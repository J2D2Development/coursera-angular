(function() {
    'use strict';

    angular.module('app', [])
        .controller('FilterTestController', FilterTestController)
        .filter('rev', ReverseFilter);

    FilterTestController.$inject = ['$scope', '$filter', 'revFilter'];

    function FilterTestController($scope, $filter, revFilter) {
        $scope.filterMe = '';
        $scope.backend = '';
        $scope.reverseMe = '';
        $scope.backendReversed = '';

        $scope.updateMe = function() {
            var bUpper = $filter('uppercase');
            $scope.backend = bUpper($scope.filterMe);
        }

        $scope.reverseMeBackend = function() {
            $scope.backendReversed = revFilter($scope.reverseMe);
        }
    }

    function ReverseFilter() {
        return function(input) {
            input = input || '';
            return input.split('').reverse().join('');
        }
    }
})();