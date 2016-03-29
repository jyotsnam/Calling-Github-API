main.service('uService',['$http' , function($http){
    this.uData = function(uname){
		console.log($http.get("https://api.github.com/users/" + uname));
        return $http.get("https://api.github.com/users/" + uname);
    };
    
    this.repos = function(uname){ 
        return $http.get("https://api.github.com/users/" + uname + "/repos");
    }
}]);