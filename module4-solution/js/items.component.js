(function() {
    'use strict';

    angular.module('MenuApp')
        .component('itemList', {
            templateUrl: './templates/items-list.template.html',
            bindings: {
                items: '<'
            }
        });
})();