(function () {

  angular
    .module('marketApp')
    .controller('buyerCtrl', buyerCtrl);

  buyerCtrl.$inject = ['$location', 'product', 'authentication'];
  function buyerCtrl($location, product, authentication) {
    var vm = this;
    vm.currentPath = $location.path();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();

    vm.formData = {};
    vm.formData.clientName = authentication.currentUser();
    console.log(vm.formData.clientName.email);

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

    vm.addToCart = function (productid) {
      console.log("the product to be added to cart is " + productid);
      var name ="";
      var price ="";
      var description=""
      var cartProducts ={
        products: []
      } ;
      product.findOneProduct(productid)
        .then(function successCallback(response) {
          var data = response.data;
          vm.data = { products: data };
          name = response.data.name;
          price = response.data.price;
          description = response.data.description;
           cartProducts.products.push({
            productid: productid,
            name: name,
            price: price,
            description: description
          })
          sessionStorage.setItem(productid, JSON.stringify(cartProducts));
          var prods =JSON.parse(sessionStorage.getItem(sessionStorage.key(index)));
          console.log("PRODS",prods);
          console.log("PRODS",sessionStorage.length);      
          for(var index=0; index <sessionStorage.length; index++){
           
            //console.log("The produts in localstorage are");
            var obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(index)));
            console.log(obj)
            vm.data = { products : obj}
          }
        },
          function errorCallback(response) {

        }) 
     
    }


  }
})();