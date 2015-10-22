var myApp = angular.module('myApp', []);

myApp.controller('AccController', function($scope, $http) {

  $scope.onSubmit = function()
  {
      $scope.school = [];

      var year_input = $scope.search;
      var url = "acc?q=" + $scope.search;
	  $http({
  	  	method: "GET",
  	  	url: url
  	  }).then(function sucessCallback(response)
  	  {
  	  	//console.log(response.data);
        var items = response['data'];
        for (var i=0; i < items.length; i++)
        {
          if (year_input == items[i].year)
          {
            if ($scope.football)
            {
              $scope.school.push({team: items[i].football});
            }
            else
            {
              $scope.school.push({team: items[i].basketball});
            }
            //console.log("success! " + items[i].football);
          }
        }
  	  }, function errorCallback(response)
  	  {
  	  	console.log(response);
  	  });

    };

});
