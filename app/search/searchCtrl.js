var searchctrlFn = function ($scope, CONSTANTS, uService ) {
    function init() {
        $scope.searchTemplate = CONSTANTS.SEARCH_TEMPLATE;
        var thisDate = new Date();
        var thisYear = thisDate.getFullYear(),
            thisMonth = thisDate.getMonth()+1;
        if(thisMonth < 10) {
            thisMonth = "0" + thisMonth;
        }
        $scope.regYear = thisMonth + "/" + thisYear;
    }
     
    $scope.findUser = function(username) 
    {
        var uname = username;
          
        uService.uData(uname).success(function (data) {
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
				$scope.userNotFound = false;
               })
               .error(function () {
                  $scope.userNotFound = true;
               });
        
        uService.repos(uname).success(function (data) {
            $scope.repos = data;
            $scope.reposFound = data.length > 0;
         });
        
    }
     
    init();
};

search.controller('searchCtrl', ['$scope','APP_CONSTANTS', 'uService' , searchctrlFn]);