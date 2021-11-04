$(document).ready(function () {
    addToCart();
    viewProductCart();
    removeCartItem();
    console.log()
});

function addToCart(){
    $(document).on("click","#addToCart", function(e){
        var id= $(this).val();
        var name ;
        var price ;
        var description ;
        var farmer ; 
       
        console.log("the retrieved id is"+id);
        $.ajax({
            type: 'GET',
            url: '/api/product/' + id,
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                name=response.name;
                price=response.price;
                description= response.description;
                id=response._id;
                console.log("the name is"+name)
                var product = {
                    name: name,
                    price: price,
                    description: description,
                    id: id
                }
                console.log(product.name, product.price, product.id, product.description);
                sessionStorage.setItem(id, JSON.stringify(product));

                console.log("added session"+sessionStorage.getItem("617fdff9b42fd7151dd72666", JSON.stringify(product)));
            }
        });
          
    })
  
}
function viewProductCart(){

    var total =0;
    var products_data ="";
    console.log(sessionStorage.length);
    for(let index=0; index <sessionStorage.length; index++){
        
            var obj = JSON.parse(sessionStorage.getItem(sessionStorage.key(index)));
            console.log(obj)
            products_data += '<tr>';
            products_data += '<td>'+obj.name + '</td>';
            products_data += '<td>'+obj.price + '</td>';
            products_data += '<td>'+obj.description + '</td>';
            /*products_data += '<td>1</td>';
            products_data += '<td>'+obj.price + '</td>'; */
            products_data += "<td><Button class='btn btn-outline-danger mt-1' id='removeProduct' value='"+obj.id+"'><i class='fa fa-trash'></i>Remove</button></td>";
            products_data += '</tr>'
            var added = parseInt(obj.price);
            total += added;
        
    }
    $("#productsBody").html(products_data);
    $("#carttable").DataTable();
}

function removeCartItem(){
    $(document).on("click","#removeProduct", function(){
        var id = $(this).val();
        console.log(id);
        sessionStorage.removeItem(id);
        viewProductCart();
    })
}