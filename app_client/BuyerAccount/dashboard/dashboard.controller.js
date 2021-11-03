(function(){
    angular
       .module('marketApp')
       .controller('dashboardCtrl', dashboardCtrl);

       dashboardCtrl.$inject = ['$location','product','authentication'];

       function dashboardCtrl($location, product, authentication){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();

        vm.formData = {};
        vm.formData.clientName = authentication.currentUser();
        console.log(vm.formData.clientName.email);
       }


})();