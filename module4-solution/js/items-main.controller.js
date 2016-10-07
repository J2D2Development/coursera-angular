(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsMainCtrl', ItemsMainCtrl);

    ItemsMainCtrl.$inject = ['items'];
    function ItemsMainCtrl(items) {
        var it= this;
        it.items = items.data.menu_items;
    }
})();