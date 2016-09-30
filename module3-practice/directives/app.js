(function() {
    'use strict';

    angular.module('app', ['ngAnimate'])
        .controller('ShoppingListOneController', ShoppingListOneController)
        .controller('ShoppingListTwoController', ShoppingListTwoController)
        .factory('ShoppingListServiceFactory', ShoppingListServiceFactory)
        .directive('shoppingList', ShoppingList);

    ShoppingListOneController.$inject = ['ShoppingListServiceFactory'];
    function ShoppingListOneController(ShoppingListServiceFactory) {
        var listOne = this;
        var sl = ShoppingListServiceFactory();
        var originalTitle = 'List 1';

        listOne.warning = 'LIST ONE WARNING';

        listOne.items = sl.getItems();
        listOne.title = originalTitle + '(' + listOne.items.length + ' items)';
        listOne.itemName = '';
        listOne.itemQuantity = '';

        listOne.updateTitle = function(newTitle) {
            console.log('in parent', newTitle);
        };

        listOne.method = function(x) {
            console.log(x);
        };


        listOne.addItem = function() {
            sl.addItem(listOne.itemName, listOne.itemQuantity);
            listOne.title = originalTitle + '(' + listOne.items.length + ' items)';
            listOne.itemName = '';
            listOne.itemQuantity = '';
        };

        listOne.removeItem = function(index) {
            console.log('remove!', index);
            sl.removeItem(index);
            listOne.title = originalTitle + '(' + listOne.items.length + ' items)';
        };
    }

    ShoppingListTwoController.$inject = ['ShoppingListServiceFactory'];
    function ShoppingListTwoController(ShoppingListServiceFactory) {
        var listTwo = this;
        var sl = ShoppingListServiceFactory(3);
        var originalTitle = 'List 2';

        listTwo.warning = 'LIST 2 WARNING';

        listTwo.items = sl.getItems();
        listTwo.title = originalTitle + '(' + listTwo.items.length + ' items)';
        listTwo.itemName = '';
        listTwo.itemQuantity = '';

        listTwo.errorMessage = function() {
            return sl.errorMessage;
        };

        listTwo.addItem = function() {
            sl.addItem(listTwo.itemName, listTwo.itemQuantity);
            listTwo.title = originalTitle + '(' + listTwo.items.length + ' items)';
            listTwo.itemName = '';
            listTwo.itemQuantity = '';
        };

        listTwo.removeItem = function(index) {
            sl.removeItem(index);
            listTwo.title = originalTitle + '(' + listTwo.items.length + ' items)';
        };
    }

    function ShoppingListService(limit) {
        var sl = this;
        sl.items = [];
        sl.errorMessage = '';

        sl.getItems = function() {
            return sl.items;
        };

        sl.addItem = function(name, quantity) {
            if(limit && sl.items.length >= limit) {
                sl.errorMessage = 'Too many items!';
            } else {
                sl.items.push({itemName: name, itemQuantity: quantity});
            }
        };

        sl.removeItem = function(index) {
            sl.items.splice(index, 1);
            if(limit && sl.items.length < limit) {
                sl.errorMessage = '';
            }
        };
    }

    function ShoppingListServiceFactory() {
        return function(limit) {
            return new ShoppingListService(limit);
        };
    }

    function ShoppingList() {
        var ddo = {
            restrict: 'E',
            scope: {
                list: '<myList',
                title: '@',
                remove: '&'
            },
            templateUrl: './shopping-list.html',
            controller: ListController,
            bindToController: true,
            controllerAs: 'ctrl',
            link: ShoppingListDirectiveLink,
            transclude: true
        };

        return ddo;
    }

    function ShoppingListDirectiveLink(scope, element, attrs, controller) {
        var errorDiv = element.find('div');

        scope.$watch('ctrl.cookiesInList()', function(newValue, oldValue) {
            if(newValue === true) {
                displayCookieWarning();
            } else {
                removeCookieWarning();
            }
        });

        function displayCookieWarning() {
            errorDiv.css('opacity', 1);
        }

        function removeCookieWarning() {
            errorDiv.css('opacity', 0);
        }
    }

    function ListController() {
        var ctrl = this;

        ctrl.cookiesInList = function() {
            var arr = ctrl.list.items;
            for(var i = 0; i < arr.length; i += 1) {
                if(arr[i].itemName.indexOf('cookie') !== -1) {
                    return true;
                }
            }
        }
    }
})();