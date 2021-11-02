(function(){

    angular
      .module('marketApp')
      .service('product', product);

      product.$inject = ['$http'];

      function product($http){
          var createProduct = function(productData){
            return $http.post('/api/product',productData);
          }

          var productList = function(email){
             return $http.get('/api/product?email='+email);
          }

          var editProduct = function(productid,productData){
            return $http.put('/api/product/'+productid+'',productData);
          }
          var deleteProduct = function(productid){
            return $http.delete('/api/product/'+productid);
          }
          var findOneProduct = function(productid){
            return $http.get('/api/product/'+productid);
          }
          var findAllProducts = function(){
            return $http.get('/api/allProducts');
          }

        this.TempData="";
        var vm = this;
        setIdData = function(productid){
            this.TempData = productid;
            //$rootScope.$emit("appointment");           
        }

        getIdData = function(){
            return this.TempData; 
        }
              
          return{
              createProduct: createProduct,
              productList: productList,
              setIdData : setIdData,
              getIdData : getIdData,
              editProduct: editProduct,
              deleteProduct: deleteProduct,
              findOneProduct: findOneProduct,
              findAllProducts: findAllProducts
          }
      }
})();