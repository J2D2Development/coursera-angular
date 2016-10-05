(function() {
    'use strict';

    angular.module('MenuApp', ['ui.router', 'data'])
        .controller('CategoryCtrl', CategoryCtrl);

    CategoryCtrl.$inject = ['categories'];
    function CategoryCtrl(categories) {
        var cat = this;
        cat.test = 'hello world';
        console.log('categories!', categories);
    }
})();