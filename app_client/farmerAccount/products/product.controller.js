(function () {
  angular
    .module('marketApp')
    .controller('productCtrl', productCtrl);

  productCtrl.$inject = ['$location', '$scope', 'product', 'authentication'];
  function productCtrl($location, $scope, product, authentication) {
    var vm = this;
    vm.currentPath = $location.path();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();

    vm.returnPage = $location.search().page || '/product';

    vm.formData = {};
    vm.formData.clientName = authentication.currentUser();
    console.log(vm.formData.clientName.email);

    //list of products
    product.productList(vm.formData.clientName.email)
      .then(function successCallback(response) {
        var data = response.data;
        vm.data = { products: data };
        console.log("The retrieved product data is ", response.data);
        console.log("the  name is ", response.data.name);

      },
        function errorCallback(response) {
          vm.formError = "No such data";
          console.log(response);
        });

    // edit product

   /* vm.onSubmit = function () {
      if (!vm.formData.name || !vm.formData.quantity || !vm.formData.price || !vm.formData.description) {
        swal({
          title: "updating a product!",
          text: "Please fill in all fields !",
          icon: "warning",
          button: "OK"
        });
      }
      else {
        vm.doUpdateProduct();
      }
    }*/
  
    /*vm.editProduct = function (productId) {
      vm.doUpdateProduct(productId);
      console.log("The product id is " + productId)
      product.findOneProduct(id)
        .then(function successCallback(response) {
          var data = response.data;
          $scope.metadata = { products: data };

          console.log("The product to be edited is", response.data);
        },
          function errorCallback(response) {

          })
    }
    // product to edit
    
    // welcome to editing
    vm.doUpdateProduct = function () {
      var id;
      console.log("Mutivutatu "+id);
      product.editProduct(id)
        .then(function successCallback() {
          swal({
            title: "updating a product!",
            text: "Product edited successfully",
            icon: "success",
            button: "Yes"
          })
          console.log("product created successfully");
        }, function errorCallback(err) {
          swal({
            title: "updating a product",
            text: "Failed to update a product",
            icon: "error",
            button: "0k"
          });
          console.log(err);
        });
    } */

    //product to remove 
    vm.removeProduct = function (id) {
      console.log("The product id is ko" + id)
      swal({
        title: "Are you sure?",
        text: "Once removed, you will no longer have this product !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            product.deleteProduct(id)
              .then(function successCallback(response) {
                swal("Product Deleted!", {
                  icon: "success",
                }).then(function () {
                  product.productList(vm.formData.clientName.email)
                    .then(function successCallback(response) {
                      var data = response.data;
                      vm.data = { products: data };
                      console.log("The retrieved product data is ", response.data);
                      console.log("the  name is ", response.data.name);

                    },
                      function errorCallback(response) {
                        vm.formError = "No such data";
                        console.log(response);
                      });
                });

                /*product.productList(vm.formData.clientName.email);
                 $location.search('page', null);
                 $location.path(vm.returnPage);*/
              }
                , function errorCallback(response) {
                  vm.formError = "No such data";
                  console.log(response);
                });


          } else {
            swal("You cancelled product Deletion!");
          }
        });


    }



  }

})();