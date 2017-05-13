'use strict';

/**
 * @ngdoc function
 * @name jeyniFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jeyniFrontApp
 */
angular.module('jeyniFrontApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    var carGetRequest = {
        'id': '',
        'name': '',
        'ownerName': '',
        'seatNumber': ''
    };
    $scope.carPostRequest = {
        'id': '',
        'name': '',
        'ownerName': '',
        'seatNumber': ''
    };
    $scope.submitRequest = function () {
        console.log('submitRequest begin');
        var dataToSend = angular.toJson($scope.carPostRequest, true);
        $http({
            method: 'POST',
            url: 'http://localhost:9090/jeyni-service/rest/car/create',
             headers: {
                'Content-Type': 'application/json'
            },
            data: dataToSend
        }).then(function successCallback(success) {
            console.log('submitRequest success: ',success);
        }, function errorCallback(error) {
            console.log('submitRequest error: ',error);
            var errorElements = document.getElementsByClassName('error');
            errorElements[0].innerHTML = error.data;
        }).finally(function(){
            console.log('submitRequest end');
        });
    };
    $scope.getRequest = function () {
        console.log('getRequest begin');
        $http({
            method: 'GET',
            url: 'http://localhost:9090/jeyni-service/rest/car/get'
        }).then(function successCallback(success) {
            console.log('getRequest success: ',success);
            carGetRequest = success.data;
            $scope.carGetResquest = carGetRequest;
        }, function errorCallback(error) {
            console.log('getRequest error: ',error);
        }).finally(function(){
            console.log('getRequest end');
        });
    };
  }]);
