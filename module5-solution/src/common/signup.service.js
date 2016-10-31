(function() {
    'use strict';

    angular.module('common')
        .service('SignUpService', SignUpService);

    SignUpService.$inject = ['$http', 'ApiPath'];
    function SignUpService($http, ApiPath) {
        var service = this;
        service.myInfo = {};

        service.saveMyInfo = function(obj) {
            service.myInfo = obj;
        };

        service.getMyInfo = function() {
            return service.myInfo;
        };

        service.getMenuItem = function(sn) {
            return $http.get(ApiPath + '/menu_items/' + sn + '.json').then(function (response) {
              return response.data;
            });
        };
    }
})();