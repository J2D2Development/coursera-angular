(function() {
    'use strict';

    var app = angular.module('app', []);

    app.controller('NameCalcController', NameCalcController);

    function NameCalcController($scope) {
        $scope.name = '';
        $scope.total = 0;

        function calculateTotal(word) {
            let result = word.split('')
                .map(letter => letter.charCodeAt(0))
                .reduce((total, next) => {
                    return total += next;
                }, 0);

            return result;
        }

        $scope.updateTotal = function() {
            $scope.total = calculateTotal($scope.name);
        }
    }
})();