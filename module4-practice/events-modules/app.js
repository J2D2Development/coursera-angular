(function() {
    'use strict';

    angular.module('app', ['ngAnimate', 'shoppingList'])
        .service('WeightLossFilterService', WeightLossFilterService)
        .controller('ShoppingListController', ShoppingListController);

    function ShoppingListController() {
        var sl = this;

        sl.name = '';
        sl.quantity = '';
        sl.items = [];
        sl.removed;
        sl.title = `You have ${sl.items.length} items`;

        sl.addItem = function() {
            sl.items.push({name: sl.name, quantity: sl.quantity});
            sl.title = `You have ${sl.items.length} items`;
        };

        sl.removeItem = function(index) {
            sl.removed = sl.items.splice(index, 1)[0];
            sl.title = `You have ${sl.items.length} items`;
        }
    }

    WeightLossFilterService.$inject = ['$q'];
    function WeightLossFilterService($q) {
        var wl = this;

        wl.checkName = function(name) {
            return $q(function(resolve, reject) {
                setTimeout(function() {
                    if(name.indexOf('cookie') !== -1) {
                        reject('Cookies found');
                    } else {
                        resolve('No cookies!');
                    }
                }, 300);
            })
        };
    }
})();