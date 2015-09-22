// var contentWs = angular.module('contentWs', ['ngRoute'])
//
// .controller('MainController', function ($scope,$http,$location) {
//   $scope.formData = {};
//
//   $scope.changePassword = function() {
//       var url = $location.absUrl();
//       var params = url.split('/');
//       var token = params[params.length-1];
//       $scope.formData.token = token;
//
//       $http.post(url,$scope.formData).success(function(data) {
//           console.log(data);
//       }).error(function(data) {
//           console.log('Error');
//       });
//   };
// });
