(function() {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$timeout', 'SignUpService', 'MenuService'];
    function SignUpController($timeout, SignUpService, MenuService) {
        var signUpCtrl = this;
        signUpCtrl.items = {};
        signUpCtrl.successfulSubmit = false;
        signUpCtrl.noMenuItemError = false;
        signUpCtrl.noMenuItemFailuresRemaining = 2;

        signUpCtrl.submit = function() {
            //save info to service (validation is done on menu item check)
            SignUpService.saveMyInfo(signUpCtrl.items);

            //show 'thank you' msg
            signUpCtrl.successfulSubmit = true;
        }

        signUpCtrl.checkMenuItem = function(details) {
            //reset 'no menu item' error on each check
            signUpCtrl.noMenuItemError = false;

            if(details.$valid) {
                signUpCtrl.items.favoriteId = signUpCtrl.items.favoriteId.toUpperCase();
                SignUpService.getMenuItem(signUpCtrl.items.favoriteId)
                    .then(function(response) {
                        //reset error countdown to dropdown disiplay
                        signUpCtrl.noMenuItemFailuresRemaining = 2;

                        //cache response for use in myinfo display
                        signUpCtrl.items.favoriteDetails = response;

                        //save info to service
                        signUpCtrl.submit();
                    })
                    .catch(function(error) {
                        signUpCtrl.noMenuItemError = true;
                        if(signUpCtrl.noMenuItemFailuresRemaining > 0) {
                            signUpCtrl.noMenuItemFailuresRemaining -= 1;
                        } else {
                            signUpCtrl.getAllItems();
                        }
                    });
            }
        }

        signUpCtrl.getAllItems = function() {
            MenuService.getMenuItems()
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log('server error:', error);
                });
        }
    }
})();