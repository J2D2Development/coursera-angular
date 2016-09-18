(function() {
    'use strict';

    angular.module('NavBar', [])
        .controller('NavBarController', NavBarController)
        .service('NavBarService', NavBarService);

    NavBarController.$inject = ['NavBarService'];

    function NavBarController(NavBarService) {
        var nav = this;
        nav.title = NavBarService.getTitle();
        nav.home = NavBarService.getHome();

        nav.setTitle = function(newTitle) {
            NavBarService.setTitle(newTitle);
        }

        console.log('navbar loaded');
        console.log(nav);
    }

    function NavBarService() {
        var navService = this;
        var title = 'test';
        var home = '/coursera-angular/';

        navService.getTitle = function() {
            return title;
        }

        navService.setTitle = function(newTitle) {
            title = newTitle;
        }

        navService.getHome = function() {
            return home;
        }
    }
})();