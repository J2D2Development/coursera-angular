(function() {
    'use strict';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['myInfo', 'ApiPath'];
    function MyInfoController(myInfo, ApiPath) {
        var myInfoCtrl = this;
        myInfoCtrl.myInfo = myInfo;
        console.log(myInfo);

        //check that a profile is set before setting image string
        if(myInfoCtrl.myInfo.firstName) {
            //set img url string
            if(myInfoCtrl.myInfo.favoriteDetails.image_present) {
                myInfoCtrl.myInfo.favoriteImg = ApiPath + '/images/' + myInfoCtrl.myInfo.favoriteId;
            }
        }
    }
})();