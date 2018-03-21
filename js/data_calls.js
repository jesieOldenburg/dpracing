"use strict";

let firebase = require("./fb-config");
var taco;

console.log("data calls on station");
var productData;

var partnumArray = [];

$("#suspension-button, #brake-button, #drivetrain-button").click(function(event) {
  event.preventDefault();

 let val = event.currentTarget.value;

  grab_data(val);
});


function objectValueGrabber(productData, val) {
    console.log("my data!!!", productData);
    
    $.each(productData, function(index, item) {
        
        let partNumber = this.part_num;
        let suspensionPN = val;
        let parsePN = partNumber.substring(0, 4);

        if (parsePN === suspensionPN) {
          partnumArray.push(item);  

        }

    });
    console.log("what is the partnumArray brosef", partnumArray);
}


function grab_data(val) {

    return $.ajax({
            url: 'https://dp-racing.firebaseio.com/products.json',
            type: 'GET',
            dataType: 'JSON',
        })
        .done(function(productData) {
            console.log("success");
            console.log("what is the product data", productData);
            objectValueGrabber(productData, val);
            return productData;
        });
}

// $(grab_data());


module.exports = {
  grab_data, objectValueGrabber
};