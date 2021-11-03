(function(){

    angular
      .module('marketApp')
      .controller('cartCtrl', cartCtrl);

      cartCtrl.$inject = ['$location','product','authentication'];
      function cartCtrl($location,product,authentication){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();

        vm.formData = {};
        vm.formData.clientName = authentication.currentUser();
        console.log(vm.formData.clientName.email);

        var retrievedProducts = {
          products: []
        };
        var prods = JSON.parse(localStorage.getItem('cart_ids'));
        console.log("This is the cart section",prods);
        console.log("PRODS",prods.productid.length);
        for( var i=0; i <prods.productid.length; i++){
          console.log("The products in the cart are" + prods.productid[i].productid)
          product.findOneProduct(prods.productid[i].productid)
            .then(function successCallback(response) {
              var data = response.data;
              vm.data = { products: data };
              console.log("The products in the cart are", response.data);
              /*retrievedProducts.products.push({
                "id":response.data[0].clientName
              })*/
              console.log("Pushed is ", retrievedProducts.products);
            },
              function errorCallback(response) {
    
              })
        }

        
      }

})();