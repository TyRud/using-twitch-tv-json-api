(function(){
  var app = angular.module('twitch.api.app',[]);
  
  app.controller('appCtrl', ['$scope','apirequest', function($scope,apirequest){

    $scope.searchCriteria = "FreeCodeCamp";
    
    $scope.enterPress = function(code){
      if(code==13)
        $scope.findInfo($scope.searchCriteria);
    }
    
    $scope.findInfo = function(element){
      $scope.newUser = {};
      $scope.newUser.name = element;
      apirequest.findinfo("streams", element).then(function(data){ $scope.newUser.stream = data;});
      apirequest.findinfo("users", element).then(function(data){ $scope.newUser.info = data;});
    };
    
    $scope.enterPress(13);
  }]);
  
  app.service('apirequest',['$http', function($http){
    var interface = { 
      findinfo: function(type, user){
        var url = "https://wind-bow.gomix.me/twitch-api/"+ type +"/"+ user +"?callback=JSON_CALLBACK";
        return $http.jsonp(url)
          .then(
            function(response){
              return response.data;
            }
          );
      }
    };
    return interface;
  }]);
  
})();