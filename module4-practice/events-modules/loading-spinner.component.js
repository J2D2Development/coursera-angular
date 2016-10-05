(function() {
    'use strict';

    angular.module('spinner')
        .controller('SpinnerController', SpinnerController)
        .component('loadingSpinner', {
            templateUrl: './loading-spinner.html',
            controller: SpinnerController
        });

    SpinnerController.$inject = ['$rootScope'];
    function SpinnerController($rootScope) {
        var $ctrl = this;
        $ctrl.showSpinner = false;

        var cancelListener = $rootScope.$on('shoppinglist:processing', function(event, data) {
            console.log('event:', event);
            console.log('data:', data);
            $ctrl.showSpinner = data.on;
        });

        $ctrl.$onDestroy = function() {
            cancelListener();
        }
    }
})();