(function() {
    'use strict';

    angular.module('app', [])
        .controller('MainController', MainController);

    function MainController() {
        var main = this;
        main.user = {
            name: '',
            email: '',
            phone: ''
        };

        main.go = function() {
            console.log('submitted:', main.user.name, main.user.email, main.user.phone);
        }
    }
})();