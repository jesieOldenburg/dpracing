"use strict";

console.log("data calls on station");
var productData;


function productCategorySorter(productData) {
    $.each(productData, function(item, index) {
        console.log("SORTER EACH FUNCTION", this.part_num);

    });

}


function grab_data() {

    return $.ajax({
            url: 'https://dp-racing.firebaseio.com/products.json',
            type: 'GET',
            dataType: 'JSON',
        })
        .done(function(productData) {
            console.log("success");
            console.log("what is the product data", productData);
            productCategorySorter(productData);
            return productData;
        });
}

$(grab_data().then((resolve) => {
    productCategorySorter(productData);

}));