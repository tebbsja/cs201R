var myApp = angular.module('myApp', []);

myApp.controller('MessageController', function($scope)
{

  $scope.messagelist = [];

  $scope.onSend = function()
  {
    $scope.messagelist.push({name: $scope.name, phoneNumber: $scope.phoneNumber, message: $scope.messageBody, done: false});
    $scope.name = "";
    $scope.phoneNumber = "";
    $scope.messageBody = "";
    console.log("Sent!");
    //console.log($scope.messagelist);
  }

  $scope.removeMsg = function()
  {
    var oldmsgs = $scope.messagelist;
    $scope.messagelist = [];
    angular.forEach(oldmsgs, function(messages) {
      if (!messages.done) $scope.messagelist.push(messages);
    });
  };
});
