(function(){

    angular
      .module('marketApp')
      .controller('farmerCtrl', farmerCtrl);

      farmerCtrl.$inject = ['$location','product','authentication'];
      function farmerCtrl($location, product,authentication){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();

        vm.formData = {};
        vm.formData.clientName = authentication.currentUser();
        console.log(vm.formData.clientName.email);

        vm.onSubmit = function(){
           if(!vm.formData.name || !vm.formData.quantity || !vm.formData.price || !vm.formData.description){
            swal({
              title: "creating a product!",
              text: "Please fill in all fields !",
              icon: "warning",
              button: "OK"
            });         
           }
           else{
              vm.doCreateProduct();
           }
        }

        vm.doCreateProduct = function(){
          product.createProduct(vm.formData)
            .then(function successCallback(){
              swal({
                title: "Creating a product!",
                text: "Product created successfully",
                icon: "success",
                button: "Yes"
              }).then(function(){
                 vm.formData.name =" ";
                 vm.formData.description =" ";
                 vm.formData.quantity =" ";
                 vm.formData.price =" ";
              });
            console.log("product created successfully");
            },function errorCallback(err){
                swal({
                    title: "Creating a product",
                    text: "Failed to create a product",
                    icon: "error",
                    button: "0k"
                  });
                 console.log(err);           
             });            
        }



      }
})();