(function() {
    'use strict';

    angular.module('restaurant')
        .controller('SignUpController', SignUpController);

    function SignUpController() {
        console.log('sign up controller!');
        var menuCtrl = this;
        menuCtrl.items = {};
    }
})();