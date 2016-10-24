(function() {
    'use strict';

    angular.module('restaurant')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$timeout', 'SignUpService'];
    function SignUpController($timeout, SignUpService) {
        console.log('sign up controller!');
        var signUpCtrl = this;
        signUpCtrl.items = {};
        signUpCtrl.successfulSubmit = false;

        signUpCtrl.submit = function(details) {
            if(details.$valid) {
                //save info to service
                SignUpService.saveItems(signUpCtrl.items);

                //show 'thank you' msg
                signUpCtrl.successfulSubmit = true;
                $timeout(function() {
                    signUpCtrl.successfulSubmit = false;
                }, 2000);
            } else {
                //show errors?
            }

            console.log(details);
            console.log(signUpCtrl.items);
        }
    }
})();