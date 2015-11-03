var myApp = angular.module('myApp', []);

myApp.controller('MessageController', function($scope, $http)
{

  $scope.messagelist = [];
  $scope.users = [];
  console.log("agentx: " + $scope.agentx);
  $scope.body = true;
  $scope.login = false;

  $scope.enter = function()
  {
    $scope.usrInitials = [];

    $scope.users.push({user: $scope.initials});
    console.log($scope.users);
    var url = "user";
    var jobj = JSON.stringify($scope.users);
    $http({
      method: "POST",
      url: url,
      data: jobj
    }).then(function successCallback(data)
      {
        console.log("Success - user");
        console.log("jobj: " + jobj);
        console.log("data: " + data);
        var url = "user";
        $http({
          method: "GET",
          url: url
        }).then(function successCallback(response)
        {
          console.log("succes");
          console.log(response);
          var items = response['data'];
          for (var i=0; i < items.length; i++)
          {
              $scope.usrInitials.push({user: items[i].user});
          }

        }, function errorCallback(response)
          {
            console.log("error");
            console.log(response);
          });
      }, function errorCallback(data)
      {
        console.log("error");
        console.log(data);
      });
      $scope.body = false;
      $scope.login = true;
  }

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
      $scope.messagelist = [];

    }, function errorCallback(data)
    {
      console.log("error");
      console.log(data);
    });

    $scope.refresh();
  }

  $scope.refresh = function()
  {
    $scope.specMessages = [];

    $scope.agentx = $scope.initials;
    console.log("agent: " + $scope.agentx);
    var url = "message?q=" + $scope.agentx;
    $http({
      method: "GET",
      url: url
    }).then(function successCallback(response)
    {
      console.log("success");
      console.log(response);

      var items = response['data'];
      for (var i=0; i < items.length; i++)
      {
        console.log(items[i].name + " " + items[i].phoneNumber + " " +items[i].message);
          $scope.specMessages.push({name: items[i].name, phoneNumber: items[i].phoneNumber, message: items[i].message});
      }

    }, function errorCallback(response)
    {
      console.log("error");
      console.log(response);
    });
  }

  $scope.removeMsg = function()
  {
    $scope.toDelete = [];
    for (var i=0; i < $scope.specMessages.length; i++)
    {
      if ($scope.specMessages[i].done)
      {
        console.log("i: " + i + " " + $scope.specMessages[i].message);
        $scope.toDelete.push({message: $scope.specMessages[i].message});
      }
    }
    for (var i=0; i < $scope.toDelete.length; i++)
    {
      var url = "delete";
      var jobj = JSON.stringify($scope.toDelete[i]);
      console.log("SENDING TO DELETE: " + i + " " + jobj);
      $http({
        method: "POST",
        url: url,
        data: jobj
      }).then(function successCallback(data)
      {
        console.log("success");

      }, function errorCallback(data)
      {
        console.log("error");
        console.log(data);
      });
    }
    $scope.refresh();
      
  }

});
