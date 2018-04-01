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
    console.log("what is the partnumArray brosef", partnumArray);
}





function searchLogic(val) {
    
  return $.ajax({
          url: `https://dp-racing.firebaseio.com/products.json`,
          type: 'GET',
          dataType: 'JSON',
          data: 'json'

  }).done( (data) => {
    
    var IdArray = Object.keys(data);
        console.log("Successful XHR Call", IdArray);

    // for(let i = 0; i < IdArray.length; i++){
    //   var currentProductID = IdArray[i];
    //   if (data[currentProductID] == ) {
    //     // statement
    //   }
    // }
 

          $.each(data, function(index, item) {

          let partKey = item.part_num,
              itemId = item.id,
              adminTarget = val,
              fullNum = partKey.substring(0, 8),
              firstThree = partKey.substring(0, 4);

        // console.log("What is itemID?", itemId);

      if (fullNum === adminTarget  || firstThree === adminTarget) {
          adminSearchArray.push(item);
      
      // $.each(adminSearchArray, function(index, item) {
        for(let i = 0; i < adminSearchArray.length; i++){

         var adminDOMCards = `
        <div  class="product-card">
          <h4 class="card-title">${this.part_num}</h4>
          <p class="card-text">Description: ${this.item_description}</p>
          <p>Price: ${this.price}</p>
          <button id="edit-btn" >Edit</button>
          <button id="delete-btn">Delete</button>
        </div>`;
        
        $("#admin-output-container").append(adminDOMCards);

        }

     
          // }); //$.each(adminSearchArray) brackets...
          }//If closing bracket...

});
});
}

function getProductById (fb_id) {

  return $.ajax({
         url: `${firebase.getFBsettings().databaseURL}/products/${fb_id}.json`
}).done((productData) =>{
    console.log("what is productData", productData);
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