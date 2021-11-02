(function(){

    angular
       .module('marketApp')
       .controller('featuredCtrl', featuredCtrl);

       featuredCtrl.$inject = ['product']
       function featuredCtrl(product){
         var vm = this;
          product
             .findAllProducts()
             .then(function successCallback(response) {
                var data = response.data;
                vm.data = { products: data };
                console.log("The retrieved product data is ", response.data);
                //console.log("the  name is ", response.data.name);
              },
                function errorCallback(response) {
                  vm.formError = "No such data";
                  console.log(response);
              });
             
       }

})();