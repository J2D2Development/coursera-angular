(function() {
    'use strict';

    angular.module('app', [])
        .controller('ShoppingListController', ShoppingListController)
        .service('ShoppingListService', ShoppingListService)
        .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListController.$inject = ['ShoppingListService'];

    function ShoppingListController(ShoppingListService) {
        var list = this;
        list.title = '';
        list.quantity = 0;

        list.items = ShoppingListService.getItems();

        list.errorMessage = ShoppingListService.getErrorMessage();

        list.itemsEmpty = function() {
            return list.items.length === 0;
        };

        list.addItem = function() {
            ShoppingListService.addItem(list.title, list.quantity);
        };

        list.removeItem = function(index) {
            ShoppingListService.removeItem(index);
        };
    }

    ShoppingListService.$inject = ['WeightLossFilterService', '$q'];
    function ShoppingListService(WeightLossFilterService, $q) {
        var slService = this;
        var items = [];
        var errorMessage = '';

        slService.getItems = function() {
            return items;
        };

        slService.addItem = function(title, quantity) {
            var nameCheck = WeightLossFilterService.checkName(title);
            var quantityCheck = WeightLossFilterService.checkQuantity(quantity);

            $q.all([nameCheck, quantityCheck])
                .then(function(response) {
                    console.log(response);
                    items.push({title: title, quantity: quantity});
                })
                .catch(function(error) {
                    handleError(error.message);
                });            
        };

        slService.removeItem = function(index) {
            items.splice(index, 1);
        };

        slService.getErrorMessage = function() {
            console.log('from fx:', errorMessage);
            return errorMessage;
        };

        function handleError(msg) {
            console.log(msg);
            errorMessage = msg;
        }
    }

    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout) {
        var wlFilter = this;

        wlFilter.checkName = function(name) {
            var deferred = $q.defer();

            var result = {
                message: ''
            };

            $timeout(function() {
                if(name.toLowerCase().indexOf('cookie') !== -1) {
                    result.message = 'No cookies!';
                    deferred.reject(result);
                } else {
                    deferred.resolve(result);
                }
            }, 1000);

            return deferred.promise;
        };

        wlFilter.checkQuantity = function(quantity) {
            var deferred = $q.defer();
            var result = {
                message: ''
            };

            $timeout(function() {
                if(quantity > 5) {
                    result.message = 'Too many items, fatso!';
                    deferred.reject(result);
                } else {
                    deferred.resolve(result);
                }
            }, 1000);

            return deferred.promise;
        };
    }
})();