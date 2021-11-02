(function(){

     angular
        .module('marketApp')
        .directive('footerGeneric', footerGeneric);

        function footerGeneric(){
            return{
                restrict: 'EA',
                templateUrl: '/common/directive/footerGeneric/footerGeneric.template.html'            
            };
        }
})();