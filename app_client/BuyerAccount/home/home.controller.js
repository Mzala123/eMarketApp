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

    /*var cartProducts = {
      productid: [

      ]
    };*/

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
          console.log("The product to be stored in localstorage is", response.data);
          console.log("The product to be stored in localstorage is", name);
          console.log("The product to be stored in localstorage is", price);
           cartProducts.products.push({
            productid: productid,
            name: name,
            price: price,
            description: description
          })
          localStorage.setItem('cart_ids', JSON.stringify(cartProducts));
      var prods = JSON.parse(localStorage.getItem('cart_ids'));
      console.log("PRODS",prods);
      console.log("PRODS",prods.products[0].productid);
        },
          function errorCallback(response) {

        })
      /*cartProducts.productid.push({
        productid
      })*/
      
     // console.log(cartProducts);
      /*localStorage.setItem('cart_ids', JSON.stringify(cartProducts));
      var prods = JSON.parse(localStorage.getItem('cart_ids'));
      console.log("PRODS",prods);
      console.log("PRODS",prods.productid);*/

    }


  }
})();