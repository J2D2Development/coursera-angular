(function() {
    'use strict';

    angular.module('common')
        .service('SignUpService', SignUpService);

    function SignUpService() {
        var service = this;
        service.items = {};

        service.saveItems = function(obj) {
            service.items = obj;
        }
    }
})();