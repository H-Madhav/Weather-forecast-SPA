//Controllers
myApp.controller('homeController',['$scope','cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
    	cityService.city = $scope.city;
    });
}]);

myApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
    	callback: "JSON_CALLBACK"}, {get:{method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: "8eace92d68b694fc86e88664133ca6d6"});

    console.log($scope.weatherResult);

    $scope.convertToCelsius = function(degk){
    	return Math.round(degk - 273.15);
    };
    
    $scope.convertToDate = function(dt){
    	return new Date(dt*1000);
    };

}]);
