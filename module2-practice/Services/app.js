(function() {
    'use strict';

    angular.module('app', [])
        .controller('ShoppingListController', ShoppingListController)
        .controller('ShoppingListShowController', ShoppingListShowController)
        .service('ShoppingListService', ShoppingListService);

    ShoppingListController.$inject = ['ShoppingListService'];
    ShoppingListShowController.$inject = ['ShoppingListService'];

    function ShoppingListController(ShoppingListService) {
        var itemAdder = this;

        itemAdder.item = '';
        itemAdder.quantity = 1;

        itemAdder.addItem = function() {
            ShoppingListService.addItem(itemAdder.item, itemAdder.quantity);
            itemAdder.item = '';
            itemAdder.quantity = 1;
        }
    }

    function ShoppingListShowController(ShoppingListService) {
        var showItems = this;
        showItems.items = ShoppingListService.getItems();

        showItems.removeItem = function(itemIndex) {
            console.log(itemIndex);
            ShoppingListService.removeItem(itemIndex);
            showItems.items = ShoppingListService.getItems();
        }
    }

    function ShoppingListService() {
        var service = this;
        var items = [];

        service.addItem = function(name, quantity) {
            items.push({
                name: name,
                quantity: quantity
            });
        }

        service.removeItem = function(itemIndex) {
            items.splice(itemIndex, 1);
        }

        service.getItems = function() {
            return items;
        }
    }
})();