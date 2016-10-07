(function() {
    'use strict';
    angular.module('spinner')
        .component('loadingSpinner', {
                templateUrl: './templates/loading-spinner.template.html',
                controller: SpinnerController
            });

    SpinnerController.$inject = ['$rootScope'];
    function SpinnerController($rootScope) {
        var $ctrl = this;
        $ctrl.showSpinner = false;

        var cancelListener = $rootScope.$on('shoppinglist:processing', function(event, data) {
            $ctrl.showSpinner = data.on;
        });

        $ctrl.$onDestroy = function() {
            cancelListener();
        };
    }
})();