$(document).ready(function () {
  /*  const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });*/

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
    $(document).on("click", "#editProductForm", function () {
        //var firstname = $('#firstname').val();
        var id = $('#id').val();
        var name = $("#name").val();
        var price = $("#price").val();
        var quantity = $("#quantity").val();
        var description= $("#description").val();
        console.log("product id to edit is" + id);
        $.ajax({
            type: "PUT",
            url: '/api/product/'+id,
            dataType: 'text',
            cache: false,
            contentType: false,
            data: new FormData(this),
            processData: false,
            success: function(dataResult){
                var result = JSON.parse(dataResult);
                if(result.statusCode === 200){
                    alert("product edited successfully");
                }else{
                   alert("failed to edit a product");
                }
            }
        })
    });
}

