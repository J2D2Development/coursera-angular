(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoryMainCtrl', CategoryMainCtrl);

    CategoryMainCtrl.$inject = ['categories'];
    function CategoryMainCtrl(categories) {
        var cat = this;
        cat.categories = categories.data;
        console.log(cat.categories);
    }
})();