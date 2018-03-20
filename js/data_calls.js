"use strict";

let firebase = require("./fb-config");


console.log("data calls on station");
var productData;

function showChosenProductCategory(partNumber) {
    if (partNumber.indexOf("299-") === true) {
        // console.log("this should show only the one item", partNumber.indexOf("299-"));

    }
}


function objectValueGrabber(productData) {
    $.each(productData, function(item, index) {
        let partNumber = this.part_num;
        showChosenProductCategory(partNumber);
        let productDescription = this.item_description;
        let productPrice = this.price;
        // console.log("SORTER EACH FUNCTION Partnumber", partNumber);

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
            // console.log("what is the product data", productData);
            objectValueGrabber(productData);
            return productData;
        });
}

$(grab_data().then((resolve) => {
    objectValueGrabber(productData);

}));

module.exports = {
  grab_data, objectValueGrabber, showChosenProductCategory
};