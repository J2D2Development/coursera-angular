(function() {
    'use strict';

    angular.module('NavBar', [])
        .controller('NavBarController', NavBarController);

    function NavBarController() {
        var nav = this;
        nav.title = 'Welcome';

        nav.home = '/';
    }
})();