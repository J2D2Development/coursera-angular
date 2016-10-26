(function() {
    'use strict';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['myInfo'];
    function MyInfoController(myInfo) {
        var myInfoCtrl = this;
        myInfoCtrl.myInfo = myInfo;
    }
})();