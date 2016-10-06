(function() {
    'use strict';

    angular.module('MenuApp')
        .component('categoryList', {
            templateUrl: './templates/category-list.template.html',
            bindings: {
                categories: '<'
            }
        });
})();