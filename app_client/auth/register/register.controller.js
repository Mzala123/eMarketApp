(function () {

    angular
        .module('marketApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', 'authentication']

    function registerCtrl($location, authentication) {
        var vm = this;
        vm.credentials = {
            name: "",
            email: "",
            phonenumber: "",
            userRole: "",
            password: ""
        }
        vm.currentPath = $location.path();
        vm.returnPage = $location.search().page || '/login';
        vm.onSubmit = function () {
            if (!vm.credentials.name || !vm.credentials.email
                || !vm.credentials.phonenumber || !vm.credentials.userRole
                || !vm.credentials.password) {
                swal({
                    title: "Creating a User Account!",
                    text: "Please fill in all fields !",
                    icon: "warning",
                    button: "OK"
                });
                return false;
            }
            else {
                console.log("Tafikamo muno tionetu");
                vm.doRegister();
            }
        }

        vm.doRegister = function () {
            authentication.register(vm.credentials)
                .then(function successCallback(response) {
                   swal({
                        title: "Creating User Account!",
                        text: "User Account Registered successfully!",
                        icon: "success",
                        button: "OK"
                    }).then(function () {
                        $location.search('page', null);
                        $location.path(vm.returnPage);
                        console.log("returned to login page");
                    })
                    /*$location.search('page', null);
                        $location.path(vm.returnPage);
                        console.log("returned to login page");
                    console.log("Registered user successfully");*/
                }
                , function errorCallback(err) {
                        vm.emailCheck = "";
                        vm.emailCheck = "Email already registered with another account";
                    });
        }


    }

})();