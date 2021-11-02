(function(){

    angular
      .module('marketApp')
      .controller('loginCtrl', loginCtrl);

      loginCtrl.$inject = ['$location', 'authentication'];
      function loginCtrl($location, authentication){
        var vm = this;
        vm.credentials = {
            email : "",
            password: "",
            userRole:""
        };

        vm.returnPage = $location.search().page || '/farmer';
        vm.returnPage1 = $location.search().page || '/buyer';
        var userType="Farmer";
        var userType1="Buyer";
       
        vm.onSubmit = function(){
            vm.formError = "";
            if(!vm.credentials.email || !vm.credentials.password){
                vm.formError = "All fields required, please try again";
                return false;
            }
            else {
               //vm.trialLogin();
               vm.doLogin();
            }
        };
      
     vm.trialLogin = function(){
         authentication
           .userRole(vm.credentials.email)
            .then(function successCallback(response){
             var data ={};
             data = response.data;
             console.log("login data ", response.data);
             vm.data = {loginData: data};
             vm.credentials.userRole = response.data.userRole ;
             console.log("the retrieved userrole is", vm.credentials.userRole);
            }
           ,function errorCallback(response) {
            vm.formError = "No such data";
            console.log(response);
           });           
      }

      
      vm.doLogin = function(){      
        vm.formError = "";   
        authentication
          .login(vm.credentials, userType)
          .then(function successCallback(response){  
            $location.search('page', null);
            $location.path(vm.returnPage);
            console.log("Logged In successfully to farmers section");
        }
         ,function errorCallback(err){
           vm.formError= "Incorrect Credentials";           
        });       
    }
    vm.doLogin1 = function(){      
      vm.formError = "";   
      authentication
        .login(vm.credentials, userType1)
        .then(function successCallback(response){  
          $location.search('page', null);
          $location.path(vm.returnPage1);
          console.log("Logged In successfully to buyer section");
      }
       ,function errorCallback(err){
         vm.formError= "Incorrect Credentials";           
      });       
    }

  }

})();