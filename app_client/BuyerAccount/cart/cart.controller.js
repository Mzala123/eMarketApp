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
       // console.log(vm.formData.clientName.email);
        /*var prods = JSON.parse(localStorage.getItem('cart_ids'));
        console.log("This is the cart section",prods);
        console.log("PRODS",prods.products.length); */
        //for( var i=0; i <prods.products.length; i++){ 
              //console.log("The products in the cart are" + prods.productid[i].productid)
            /*  var data ;
              var prods = JSON.parse(localStorage.getItem('cart_ids'));
              vm.data = { products: prods };
              console.log("The products in the cart are", prods);*/
              /*retrievedProducts.products.push({
                "id":response.data[0].clientName
              })
              // console.log("Pushed is ", retrievedProducts.products);   
        //}
      console.log("The product id is " + prods.products[0].productid)
      product.findOneProduct(prods.products[0].productid)
        .then(function successCallback(response) {
          var data = response.data;
          vm.data = { products: data };
          console.log("The product to be edited is", response.data);
        },
          function errorCallback(response) {

          })*/
    

        
      }

})();