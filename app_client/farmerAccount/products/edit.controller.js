$(document).ready(function(){
   selectRecord();
});

function selectRecord(){
    $(document).on("click","#editProduct",function(){
        var id = $(this).val();
        console.log(""+id);
        $.ajax({
            type: 'GET',
            url: '/api/product/'+id,
            dataType: 'JSON',
            success: function(response){
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

