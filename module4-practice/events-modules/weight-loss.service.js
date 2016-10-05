(function() {
    'use strict';

    angular.module('app')
        .service('WeightLossFilterService', WeightLossFilterService);


    WeightLossFilterService.$inject = ['$q'];
    function WeightLossFilterService($q) {
        var wl = this;

        wl.checkName = function(name) {
            return $q(function(resolve, reject) {
                setTimeout(function() {
                    if(name.indexOf('cookie') !== -1) {
                        reject('Cookies found');
                    } else {
                        resolve('No cookies!');
                    }
                }, 300);
            })
        };
    }
});