(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsMainCtrl', ItemsMainCtrl);

    ItemsMainCtrl.$inject = ['items', 'catName'];
    function ItemsMainCtrl(items, catName) {
        var it= this;
        it.items = items.data.menu_items;
        it.category = catName;
    }
})();