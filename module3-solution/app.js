(function() {
    'use strict';

    angular.module('NarrowItDownApp', ['ngAnimate'])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var nd = this;
        var submitted = false;

        nd.searchTerm = '';
        nd.found = [];
        nd.error = '';

        nd.getMatchedMenuItems = function() {
            submitted = false;

            if(!nd.searchTerm) {
                submitted = true;
                nd.error = 'Nothing found';
                nd.found = [];
                return;
            }

            nd.error = '';
            MenuSearchService.getMatchedMenuItems(nd.searchTerm)
                .then(function(response) {
                    submitted = true;
                    if(!response) {
                        nd.error = 'Nothing found';
                        nd.found = [];
                    } else {
                        nd.found = response;
                    }
                });
        };

        nd.clear = function() {
            nd.error = '';
            nd.found = [];
            nd.searchTerm = '';
            MenuSearchService.clear();
        }

        nd.loaderShow = function() {
            return MenuSearchService.getLoaderStatus();
        };

        nd.removeItem = function(index) {
            MenuSearchService.removeItem(index);
            if(nd.listEmpty()) {
                nd.error = 'Nothing left!';
            }
        };

        nd.listEmpty = function() {
            return submitted && nd.found.length === 0;
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var ms = this;
        var found = [];
        var loaderShow = false;

        ms.getLoaderStatus = function() {
            return loaderShow;
        };

        ms.clear = function() {
            found = [];
        };

        ms.getMatchedMenuItems = function(searchTerm) {
            var url = 'https://davids-restaurant.herokuapp.com/menu_items.json';

            ms.showLoader(true);

            return $http({
                type: 'GET',
                url: url
            })
            .then(function(response) {
                var menuItems = response.data.menu_items;
                return menuItems.filter(function(item) {
                    if(item.description.indexOf(searchTerm) !== -1) {
                        return item;
                    }
                });
            })
            .then(function(response) {
                ms.showLoader(false);
                if(response.length === 0) {
                    return false;
                } else {
                    found = response;
                    return found;
                }
            })
            .catch(function(error) {
                throw new Error('Could not connect to api server');
            });
        };

        ms.showLoader = function(show) {
            loaderShow = show;
        };

        ms.removeItem = function(index) {
            found.splice(index, 1);
        };
    }

    function FoundItems() {
        var ddo = {
            scope: {
                found: '<found',
                error: '<error',
                removeItem: '<removeItem'
            },
            link: FoundItemsLink,
            templateUrl: './found-items-template.html'
        };

        return ddo;
    }

    function FoundItemsLink(scope, element) {
        var errorDiv = element.find('.menu-list-error');
        var loader = element.find('.loader');

        scope.$parent.$watch('nd.listEmpty()', function(newValue, oldValue) {
            if(newValue) {
                showError();
            } else {
                hideError();
            }
        });

        scope.$parent.$watch('nd.loaderShow()', function(newValue, oldValue) {
            if(newValue) {
                showLoader();
            } else {
                hideLoader();
            }
        });

        function showError() {
            errorDiv.addClass('menu-list-error--show');
        }

        function hideError() {
            errorDiv.removeClass('menu-list-error--show');
        }

        function showLoader() {
            loader.addClass('loader-show');
        }

        function hideLoader() {
            loader.removeClass('loader-show');
        }
    }
})();