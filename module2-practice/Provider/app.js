(function() {
    'use strict';

    angular.module('app', [])
        .controller('ShoppingListController', ShoppingListController)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 2;
    }

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        var list = this;
        list.items = ShoppingListService.getItems();
        list.name = '';
        list.quantity = 0;
        list.errorMessage = '';

        list.addItem = function() {
            try {
                ShoppingListService.addItem({name: list.name, quantity: list.quantity});
                list.name = '';
                list.quantity = 0;
            } catch(error) {
                console.log(error.message);
                list.errorMessage = error.message;
            }
        }

        list.removeItem = function(index) {
            ShoppingListService.removeItem(index);
        }
    }

    function ShoppingListService(maxItems) {
        var service = this;
        service.items = [];

        service.getItems = function() {
            return service.items;
        }

        service.addItem = function(item) {
            if(!maxItems || service.items.length < maxItems) {
                service.items.push(item);
            } else {
                throw new Error('Too many items!');
            }
        }

        service.removeItem = function(index) {
            service.items.splice(index, 1);
        }
    }

    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function() {
            var shoppingList = new ShoppingListService(provider.defaults.maxItems);
            return shoppingList;
        };
    }
})();