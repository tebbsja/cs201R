var myApp = angular.module('myApp', []);

myApp.controller('MessageController', function($scope, $http)
{

  $scope.messagelist = [];

  $scope.onSend = function()
  {
    $scope.messagelist.push({name: $scope.name, phoneNumber: $scope.phoneNumber, message: $scope.messageBody, agent: $scope.agent, done: false});
    $scope.name = "";
    $scope.phoneNumber = "";
    $scope.messageBody = "";
    console.log("Sent!");
    console.log("Agent: " + $scope.agent)
    var url = "message";
    var jobj = JSON.stringify($scope.messagelist);
    $http({
      method: "POST",
      url: url,
      data: jobj
    }).then(function successCallback(data)
    {
      console.log("jobj: " + jobj);
    }, function errorCallback(data)
    {
      console.log("error");
      console.log(data);
    });
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
