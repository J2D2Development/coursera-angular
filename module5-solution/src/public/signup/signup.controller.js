(function() {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['SignUpService', 'MenuService'];
    function SignUpController(SignUpService, MenuService) {
        var signUpCtrl = this;
        var totalErrorsAllowed = 3;

        signUpCtrl.items = {};
        signUpCtrl.submitted = false;
        signUpCtrl.successfulSubmit = false;
        signUpCtrl.noMenuItemError = false;
        signUpCtrl.noMenuItemFailuresRemaining = totalErrorsAllowed;
        signUpCtrl.allItemsList = [];

        signUpCtrl.submit = function() {
            //save info to service (validation is done on menu item check)
            SignUpService.saveMyInfo(signUpCtrl.items);

            //show 'thank you' msg
            signUpCtrl.successfulSubmit = true;
        };

        signUpCtrl.checkMenuItem = function(details) {
            //reset 'no menu item' error on each check
            signUpCtrl.noMenuItemError = false;
            signUpCtrl.submitted = true;

            if(details.$valid) {
                //convert to uppercase to ensure match on valid id
                signUpCtrl.items.favoriteId = signUpCtrl.items.favoriteId.toUpperCase();

                SignUpService.getMenuItem(signUpCtrl.items.favoriteId)
                    .then(function(response) {
                        //cache response for use in myinfo display
                        signUpCtrl.items.favoriteDetails = response;

                        //save info to service
                        signUpCtrl.submit();

                        //reset error countdown to dropdown disiplay
                        signUpCtrl.noMenuItemFailuresRemaining = totalErrorsAllowed;

                        //reset 'submitted' variable to false to track future submission validation
                        signUpCtrl.submitted = false;
                    })
                    .catch(function(error) {
                        signUpCtrl.noMenuItemError = true;
                        if(signUpCtrl.noMenuItemFailuresRemaining === 1) {
                            //prefetch list of menu items in case of another invalid attempt
                            signUpCtrl.getAllItems();
                        }

                        signUpCtrl.noMenuItemFailuresRemaining -= 1;
                    });
            }
        };

        signUpCtrl.getAllItems = function() {
            MenuService.getMenuItems()
                .then(function(response) {
                    signUpCtrl.allItemsList = response.menu_items;
                    return signUpCtrl.allItemsList;
                })
                .then(function(allItems) {
                    signUpCtrl.items.favoriteId = allItems[0].short_name;
                })
                .catch(function(error) {
                    console.log('server error:', error);
                });
        };
    }
})();