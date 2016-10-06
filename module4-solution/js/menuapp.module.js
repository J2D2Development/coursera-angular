(function() {
    'use strict';

    angular.module('MenuApp', ['ui.router', 'data'])
    .controller('ItemsMainCtrl', ItemsMainCtrl);

    ItemsMainCtrl.$inject = ['items'];
    function ItemsMainCtrl(items, categoryTitle) {
        var it= this;
        it.items = items.data.menu_items;
        it.categoryTitle = 'test title';
        console.log(it.items);
    }
})();