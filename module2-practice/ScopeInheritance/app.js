(function() {
    'use strict';

    angular.module('app', [])
        .controller('ParentController1', ParentController1)
        .controller('ChildController1', ChildController1)
        .controller('ParentController2', ParentController2)
        .controller('ChildController2', ChildController2);

    ParentController1.$inject = ['$scope'];
    ChildController1.$inject = ['$scope'];

    function ParentController1($scope) {
        $scope.parentValue = 1;
        $scope.pc = this;
        $scope.pc.parentValue = 1;
    }

    function ChildController1($scope) {
        // console.log('Inside child, $scope.parentValue is:', $scope.parentValue);
        // console.log('Child scope:', $scope);

        // $scope.parentValue = 5;
        // console.log('$scope.parentValue changed to:', $scope.parentValue);
        // console.log('but scope still has original parentValue in $scope.pc:', $scope.pc.parentValue);

        // $scope.pc.parentValue = 12;
        // console.log('tried to change parent scope parentValue:', $scope.pc.parentValue);
        // console.log('full scope on child:', $scope);

        // console.log('parent parentValue is still:', $scope.$parent.parentValue)
    }

    function ParentController2() {
        var parent = this;
        parent.value = 1;
        parent.test = 'Hello World';
    }

    function ChildController2() {
        var child = this;
        child.value = 5;
    }
})();