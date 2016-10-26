(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://mysterious-depths-84805.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
