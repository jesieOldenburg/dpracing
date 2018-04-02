"use strict";

let firebase = require("./fb-config");

console.log("data calls on station");
var productData;

var partnumArray = [];
var adminSearchArray = [];


$("#suspension-button, #brake-button, #drivetrain-button").click(function(event) {
  event.preventDefault();
 let val = event.currentTarget.value;
//consider putting the DOM removal {}here

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
                <h4 class="card-title">${item.part_num}</h4>
                  <p class="card-text">
                    ${item.item_description} <br>
                  </p> 
                  <p class="card-price"> 
                    Price: ${item.price}
                  </p>
              </div> `;


            $("#card-group").append(productDomString);

          });

        }

    });
    // console.log("what is the partnumArray brosef", partnumArray);
}





function printSearchResults (data) {
 
let partsSearchQuery = $("#admin-search-btn").attr('value');

$.each(data, function(item, val) {

        var partKey = this.part_num,
            itemId = this.id, 
            searchTarget = partsSearchQuery,

            fullNum = partKey.substring(0, 8),
            firstThree = partKey.substring(0, 4);

        if (fullNum == searchTarget  || firstThree == searchTarget) {
            adminSearchArray.push(data);
          
            for(let i = 0; i < adminSearchArray.length; i++){

                var adminDOMCards = `
                    <div class="product-card">
                        <h4 class="card-title">${this.part_num}</h4>
                        <p class="card-text">Description: ${this.item_description}</p>
                        <p>Price: ${this.price}</p>
                        <button class="edit-btn" value="${this.id}">Edit</button>
                        <button class="delete-btn" value="${this.id}">Delete</button>
                    </div>`;

                $("#admin-output-container").append(adminDOMCards);

            }
        }//If closing bracket...
    }); //first each brackets....
}



function searchLogic() {

  return $.ajax({
          url: `https://dp-racing.firebaseio.com/products.json`,
          type: 'GET',
          dataType: 'JSON',
  }).done( (data) => {
    
    console.log("Successful XHR Call");

    let keys = Object.keys(data);
    
    for (var item in data) {
        var currentProductID = item;
        data[item].id = currentProductID;
    }      
    printSearchResults(data);
});
}



function getProductById (fb_id) {

  return $.ajax({
         url: `${firebase.getFBsettings().databaseURL}/products/${fb_id}.json`
}).done((productData) =>{
    // console.log("what is productData", productData);
    return productData;
}).fail((error) =>{
    return error;
});
}






function grab_data(val) {

    return $.ajax({
            url: 'https://dp-racing.firebaseio.com/products.json',
            type: 'GET',
            dataType: 'JSON',
        })
        .done(function(productData) {
            console.log("success");

            // partNumberFilter(productData, val);
            partNumberFilter(productData);
            return productData;
        });
}

// $(grab_data());


module.exports = {
  grab_data, partNumberFilter, productData, searchLogic, getProductById
};