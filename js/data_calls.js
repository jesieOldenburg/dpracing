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




/** 
 * Sorts the products by part number, to populate the DOM with product cards of a category
 * @param {array} productData - An array of objects; Pulled from XHR call to FireBase
 * @param {val} val - The value of the targeted HTML button element; Values reflect the first 3 numbers of the part number value in a product object.
 */

function partNumberFilter(productData, val) {

    $.each(productData, function(index, item) {
        
        let partNumber = this.part_num;
        let targetPartNum = val;
        let parsePN = partNumber.substring(0, 4);

        if (parsePN === targetPartNum) {
          partnumArray.push(item);  
         
          $.each(partnumArray, function(index, item) {
           
            let productDomString = 
            `<div class="product-card">
              <div class="card-body">
                <h4 class="card-title">${item.part_num}</h4>
                  <p class="card-text">
                    ${item.item_description} <br>
                    Price: ${item.price}
                  </p>
                </div>
              </div> `;

            $("#card-group").append(productDomString);

          });

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
            partNumberFilter(productData, val);
            return productData;
        });
}

// $(grab_data());


module.exports = {
  grab_data, partNumberFilter
};