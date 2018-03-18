"use strict";

console.log("data calls on station");
var productData;


function grab_data() {

    return $.ajax({
            url: 'https://dp-racing.firebaseio.com/products.json',
            type: 'GET',
            dataType: 'JSON',
        })
        .done(function(productData) {
            console.log("success");
            console.log("what is the product data", productData);
            return productData;
        });
}

$(grab_data().then((resolve) => {
    let workableDataObject = JSON.parse(resolve);
    console.log("what is parsed data", productData);
}));