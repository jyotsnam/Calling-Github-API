var searchctrlFn = function ($scope, CONSTANTS, $http ) {
    function init() {
        $scope.searchTemplate = CONSTANTS.SEARCH_TEMPLATE;
    }
     
    $scope.findUser = function(username) 
    {
          $http.get("https://api.github.com/users/" + username)
              .success(function (data) {
                  if (data.name == "") data.name = data.login;
                  $scope.user = data;
                  $scope.loaded = true;
                    
                  var arr1 = []; 
                  $.each(data, function(key, name) {
                      arr1.push({ key: key,  name: name});
                  });
                  arr2 = arr1.sort(function(a, b) {
                      return ((a.key < b.key) ? -1 : ((a.key > b.key) ? 1 : 0));
                      });
                  $scope.sortedData = arr2;
                  $scope.isSortedData = true;
               })
               .error(function () {
                  $scope.userNotFound = true;
               });
        
         $http.get("https://api.github.com/users/" + username + "/repos").success(function (data) {
            $scope.repos = data;
            $scope.reposFound = data.length > 0;
         });
        
    }
     
    init();
};

search.controller('searchCtrl', ['$scope','APP_CONSTANTS', '$http' , searchctrlFn]);