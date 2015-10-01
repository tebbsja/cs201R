var app = angular.module('myApp', []);

app.controller('toDoController', function($scope) {
  $scope.familyList = [];


  $scope.addRelative = function() {
    //take names of relatives when submit is hit, add those to to-do-bullets, clear input fields
    $scope.familyList.push({person:$scope.Person, dad:$scope.Dad, mom:$scope.Mom, done:false});
    $scope.Person = "";
    $scope.Dad = "";
    $scope.Mom = "";
  };

  $scope.removeRelative = function() {
    var oldList = $scope.familyList;
    $scope.familyList = [];
    angular.forEach(oldList, function(relatives) {
      if (!relatives.done) $scope.familyList.push(relatives);
    });
  };

});
