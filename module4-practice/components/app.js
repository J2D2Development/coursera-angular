(function() {
    'use strict';

    angular.module('ShoppingListComponentApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .component('shoppingList', {
            templateUrl: 'shopping-list.html',
            controller: ShoppingListComponentController,
            bindings: {
                items: '<',
                myTitle: '@',
                remove: '&'
            }
        });

    ShoppingListComponentController.$inject = ['$element'];
    function ShoppingListComponentController($element) {
        var $ctrl = this;
        var totalItems;

        $ctrl.cookiesInList = function() {
            return $ctrl.items.some(function(item) {
                return item.name.toLowerCase().indexOf('cookie') !== -1;
            });
        };

        $ctrl.$onInit = function() {
            totalItems = 0;
        };

        $ctrl.$onChanges = function(obj) {
            console.log('changes:', obj);
        };

        $ctrl.$doCheck = function() {
            if($ctrl.items.length !== totalItems) {
                var warningEle = $element.find('.errorOp');
                totalItems = $ctrl.items.length;

                if($ctrl.cookiesInList()) {
                    warningEle.addClass('errorOpShow');
                } else {
                    warningEle.removeClass('errorOpShow');
                }
            }
        };
    }

    ShoppingListController.$inject = ['ShoppingListFactory'];
    function ShoppingListController(ShoppingListFactory) {
        var sl = this;
        var factory = ShoppingListFactory();

        sl.name = '';
        sl.quantity = '';
        sl.lastRemoved;
        sl.items = factory.getItems();
        sl.title = `Buy this: ${sl.items.length} items`;

        sl.addItem = function() {
            factory.addItem(sl.name, sl.quantity);
            sl.title = `Buy this: ${sl.items.length} items`;
            sl.name = '';
            sl.quantity = '';
        };

        sl.removeItem = function(index) {
            sl.lastRemoved = factory.removeItem(index);
            sl.title = `Buy this: ${sl.items.length} items`;
        };
    }

    function ShoppingListService(limit) {
        var service = this;
        var items = [];

        service.getItems = function() {
            return items;
        };

        service.addItem = function(name, quantity) {
            items.push({name: name, quantity: quantity});
        };

        service.removeItem = function(index) {
            var removed = items.splice(index, 1);
            return removed[0];
        };
    }

    function ShoppingListFactory() {
        var factory = function(limit) {
            return new ShoppingListService(limit);
        };

        return factory;
    }
})();