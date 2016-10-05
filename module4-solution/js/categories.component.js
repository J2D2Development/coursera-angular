(function() {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: './templates/category-list.template.html',
            controller: CategoryCtrl,
            bindings: {
                categories: '<'
            }
        });

    CategoryCtrl.$inject = ['categories'];
    function CategoryCtrl(categories) {
        var ct = this;
        ct.test = 'fuck off';
    }
})();