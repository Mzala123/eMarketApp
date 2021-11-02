(function (){

  angular.module('marketApp', ['ngRoute','ngSanitize']);

  function config($routeProvider, $locationProvider){
      $locationProvider.hashPrefix('');

      $routeProvider
      .when('/', {
          templateUrl: 'home/home.view.html',
          controller:  'homeCtrl',
          controllerAs: 'vm'
      })
      .when('/aboutUs', {
          templateUrl: '/about/about.view.html',
          /*controller:  'homeCtrl',*/
          controllerAs: 'vm'
      })
      .when('/services', {
          templateUrl: '/services/service.view.html',
          /*controller:  'homeCtrl',*/
          controllerAs: 'vm'
      })
      .when('/register', {
          templateUrl: '/auth/register/register.view.html',
          controller: 'registerCtrl',
          controllerAs: 'vm'
       })
      .when('/login',{
          templateUrl: '/auth/login/login.view.html',
          controller: 'loginCtrl',
          controllerAs: 'vm'
        })
        .when('/farmer', {
          templateUrl: '/farmerAccount/home/home.view.html',
          controller: 'farmerCtrl',
          controllerAs: 'vm'
       })
       .when('/product', {
          templateUrl: '/farmerAccount/products/product.view.html',
          controller: 'productCtrl',
          controllerAs: 'vm'
       })
       .when('/featuredProduct', {
          templateUrl: '/featuredProducts/products.view.html',
          controller: 'featuredCtrl',
          controllerAs: 'vm'
       })

      .otherwise({ redirectTo: '/' });
      $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
      });
  }

  angular
     .module('marketApp')
     .config(['$routeProvider', '$locationProvider', config])
   
})();