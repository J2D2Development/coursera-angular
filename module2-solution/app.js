(function() {
    'use strict';

    angular.module('app', ['ngAnimate'])
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var bought = this;

        bought.cart = ShoppingListCheckOffService.getAlreadyBought();

        bought.moveBack = function(index, quantity, name) {
            ShoppingListCheckOffService.removeItemFromBoughtList(index);
            ShoppingListCheckOffService.addItem(name, quantity);
        };

        bought.cartIsEmpty = function() {
            return bought.cart.length === 0;
        };
    }

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService', '$timeout'];
    function ToBuyShoppingController(ShoppingListCheckOffService, $timeout) {
        var buy = this;
        buy.success = false;
        buy.clicked;
        buy.newItemQuantity = '';
        buy.newItemName = '';
        buy.list = ShoppingListCheckOffService.getToBuy();
        buy.boughtAll = false;

        buy.buyItem = function(clickedLi) {
            buy.success = true;
            buy.clicked = clickedLi;

            //wait for animations, then remove bought item
            $timeout(function() {
                buy.success = false;
                ShoppingListCheckOffService.buyItem(buy.clicked);
                buy.clicked = 999;
            }, 300);
        };

        buy.addItem = function() {
            ShoppingListCheckOffService.addItem(buy.newItemName, buy.newItemQuantity);
            buy.newItemName = '';
            buy.newItemQuantity = '';
        };

        buy.listIsEmpty = function() {
            return buy.list.length === 0;
        };

        buy.removeItem = ShoppingListCheckOffService.removeItemFromBuyList;
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var alreadyBought = [];
        var toBuy = [
            {name: 'Bag of Rice', quantity: '1'},
            {name: 'Loaves of Bread', quantity: '2'},
            {name: 'Apples', quantity: '5'},
            {name: 'Jars of Salsa', quantity: '2'},
            {name: 'Bags of Chips', quantity: '3'},
        ];

        service.getAlreadyBought = function() {
            return alreadyBought;
        };

        service.getToBuy = function() {
            return toBuy;
        }

        service.buyItem = function(itemIndex) {
            var boughtItem = toBuy.splice(itemIndex, 1)[0];
            alreadyBought.push(boughtItem);
        }

        service.addItem = function(name, quantity) {
            toBuy.push({name: name, quantity: quantity});
        }

        service.removeItemFromBuyList = function(itemIndex) {
            toBuy.splice(itemIndex, 1);
        }

        service.removeItemFromBoughtList = function(itemIndex) {
            alreadyBought.splice(itemIndex, 1);
        }
    }
})();