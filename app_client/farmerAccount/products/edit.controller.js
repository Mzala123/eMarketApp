$(document).ready(function () {
    selectRecord();
    editProductRecord();
});

function selectRecord() {
    $(document).on("click", "#editProduct", function () {
        var id = $(this).val();
        console.log("" + id);
        $.ajax({
            type: 'GET',
            url: '/api/product/' + id,
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                $("#name").val(response.name);
                $("#price").val(response.price);
                $("#quantity").val(response.quantity);
                $("#description").val(response.description);
                $("#id").val(response._id);
            }
        });
    });
}

function editProductRecord() {
    $(document).on("submit", "#editProductForm", function (e) {
        e.preventDefault();
        var email = $('#userEmail').val();
        var id = $('#id').val();
        var name = $("#name").val();
        var price = $("#price").val();
        var quantity = $("#quantity").val();
        var description = $("#description").val();
        console.log("product id to edit is" + id, email);
        $.ajax({
            type: "PUT",
            url: '/api/product/' + id,
            dataType: 'JSON',
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                quantity: quantity,
                description: description,
                price: price
                //id: id
            }),
            success: function () {
                swal({
                    title: "updating a product!",
                    text: "Product edited successfully",
                    icon: "success",
                    button: "Yes"
                })//.then( function(){
                  //  getUpdatedRecords(email)
                //})
            },
            error: function () {
                swal({
                    title: "updating a product",
                    text: "Failed to update a product",
                    icon: "error",
                    button: "0k"
                });
            }
        })
    });
}

/*function getUpdatedRecords(email) {
    email = $('#userEmail').val();
    console.log("" + id);
    $.ajax({
        type: 'GET',
        url: '/api/product?email='+email,
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
        }
    });
}*/

