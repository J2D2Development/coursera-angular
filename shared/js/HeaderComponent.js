(function () {
    'use strict';

    angular.module('HeaderComponent', [])
        .controller('HeaderComponentController', HeaderComponentController)
        .directive('headerNav', HeaderDirective);

    function HeaderComponentController() {
        var header = this;
    }

    function HeaderDirective() {
        var ddo = {
            scope: {
                title: '@',
                class: '@'
            },
            templateUrl: '/shared/header-template.html',
            bindToController: true,
            controller: 'HeaderComponentController',
            controllerAs: 'header'
        };

        return ddo;
    }
})();