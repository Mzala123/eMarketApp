(function(){

    angular
       .module('marketApp')
       .directive('buyernavigation', buyernavigation);

       function buyernavigation(){
           return{
               restrict: 'EA',
               templateUrl: '/common/directive/buyernavigation/buyernavigation.template.html'
           }
       }

})();