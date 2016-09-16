(function() {
    'use strict';

    angular.module('app', [])
        .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];

    function ShoppingListController($scope) {
        $scope.newItemName = '';
        $scope.newItemQuantity = '';
        $scope.shoppingList1 = ['eggs', 'milk', 'bread'];
        $scope.shoppingList2 = [
            {name: 'eggs', quantity: 2},
            {name: 'milk', quantity: 1},
            {name: 'bread', quantity: 4}
        ];
        $scope.shoppingList3 = [
            {name: 'candy', quantity: 2},
            {name: 'cookies', quantity: 1},
            {name: 'ice cream', quantity: 4},
            {name: 'eggs', quantity: 2},
            {name: 'milk', quantity: 1},
            {name: 'bread', quantity: 4}
        ];

        $scope.addItem = function(item, quantity) {
            $scope.shoppingList2.push({name: item, quantity: quantity});
            $scope.newItemName = '';
            $scope.newItemQuantity = '';
        }
    }
})();