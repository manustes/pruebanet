/**
 * Created by USER
 */


(function(){

    var myApp =  angular.module("GeekStore", []);
    //controllers

    myApp.controller("ProductsController" , ProductsController);

    ProductsController.$inject = ['$scope' , '$http'];
    function ProductsController($scope, $http) {
        $scope.productosVenta = [
            {id: 1, nombre:"Maestro Yoda", precio:75000, moneda:"COP" }, 
            {id: 2,nombre:"Sable laser de plástico", precio:35, moneda:"USD" },
            {id: 3,nombre:"Nave espacial Halcón Milenario", precio:125000, moneda:"COP" },
            {id: 4,nombre:"Estrella de la muerte", precio:200, moneda:"USD" },
            {id: 5,nombre:"R2D2 en fichas de Lego", precio:450, moneda:"MXN" },
            {id: 6,nombre:"Jar Jar Binks Gobernador", precio:800, moneda:"MXN" }
        ];
        $scope.products = [];
        $scope.product = "";
        $scope.quantity = 0;
        $scope.value = 0;

        var URL = "/api/productos";

        $http.post(URL,{}).
        success(function(data, status, headers, config) {

            console.log(data);
        }).
        error(function(data, status, headers, config) {
            console.log("Error " + data + " " + status);
            $scope.message = "There was an error creating the matrix";
        });


        $scope.message = "Usted no ha realizado ninguna compra aún";
        $scope.addProduct =  function(){
            if (Number($scope.quantity) > 0){
                var cont = 0;
                for(var i = 0 ;  i < $scope.products.length; i++){
                    if(  $scope.products[i].name == $scope.product){
                        $scope.products[i].quantity = Number($scope.products[i].quantity) + Number($scope.quantity);
                        cont++;
                    }
                }
                if (cont == 0)
                    $scope.products.push(  {id:$scope.product.id, name: $scope.product.nombre, quantity: $scope.quantity , value: $scope.product.precio, cambio: $scope.product.moneda });
                    
                $scope.product = "";
                $scope.quantity = 0;
                $scope.value = 0;
            }else{
                alert('debe seleccionar el número de productos a comprar.');
            }
        };



        $scope.removeProduct =  function(productName){
            for(var i = 0 ;  i < $scope.products.length; i++){
                if(  $scope.products[i].name == productName){
                    $scope.products.splice(i, 1);
                }
            }
        };

        $scope.buyProducts =  function(){
            //TODO
            var URL = "/api/invoice";
            var jsondata =  {products: $scope.products};

            $http.post(URL, jsondata).
            success(function(data, status, headers, config) {

                console.log(data);
                $scope.products = null;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });


        };



    }


})();