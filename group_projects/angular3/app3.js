var myApp = angular.module('myApp', ['validation.match']);

myApp.controller('ProfileController', function($scope, $location, $http) {

  $scope.userProfile = [];
  $scope.repoList = [];

  $scope.onSubmit = function()
  {
      $scope.fullAddress =  $scope.StreetAddress + ' ' + $scope.City + ' ' + $scope.State + ' ' + $scope.Zip;
      $scope.userProfile.push({ username:$scope.Username, password:$scope.Password, email:$scope.Email, address:$scope.fullAddress, avatar:$scope.Avatar,
      	githubuser:$scope.GithubUser, githubRepo:$scope.GithubRepo});
      console.log($scope.userProfile);
      $scope.toHide = true;

      var url = "https://api.github.com/repos/" + $scope.GithubUser + "/" + $scope.GithubRepo + "/contents";
	  $http({
  	  	method: "GET",
  	  	url: url
  	  }).then(function sucessCallback(response)
  	  {
  	  	//console.log(response);
  	  	populateTable(response);
  	  }, function errorCallback(response)
  	  {
  	  	console.log(response);
  	  });

  	  var populateTable = function(parsedJSON)
  	  {
  	  	var items = parsedJSON['data'];
  	  	for(var i = 0; i < items.length; i++)
  	    {
  	    	/*var child = [];
  	    	if(items[i]['type'] === "dir")
  	    	{
  	    		$http({
			  		method: "GET",
			  		url: items[i]['git_url']
			  	}).then(function successCallback(response)
			  	{
			  		console.log("response2");
			  		console.log(response['data']['tree']);
			  		//child = response['data']['tree'];
			  		for(var l; l < response['data']['tree'].length; l++)
			  		{
			  			child.push(response['data']['tree'][i]['path']);
			  		}
			  	}, function errorCallback(reponse)
			  	{
			  		console.log("error");
			  		console.log(response);
			  	});
  	    	}*/
  	  	  $scope.repoList.push({name:items[i]['name'], url:items[i]['html_url']});//, children:child});
  	    }
  	    console.log("success");
  	    console.log($scope.repoList);
  	  };

    };

});
