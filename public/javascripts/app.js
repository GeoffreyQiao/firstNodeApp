$("#formSubmit").on('click', function(event) {
    event.preventDefault();
    var formData = $('#edit-product').serialize();

    $.ajax({
        url: 'http://127.0.0.1/products/addProduct',
        dataType: 'json',
        type: "POST",
        data: formData,
        success: function(data) {
            location.href = data.redirect;
        }
    })
});
