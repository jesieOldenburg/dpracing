"use strict";
console.log("admin here");

let firebase = require("./fb-config");
let signInAuth = require("./user.js");

var arrayOfKeys = [];

function pushNewItemToFB (newItemObject) {
  console.log("pushNewItemToFB", newItemObject);
  
  return $.ajax({
  url: `${firebase.getFBsettings().databaseURL}/products.json`,
  type: 'POST',
  data: JSON.stringify(newItemObject),
  dataType: 'json'
  })
    .done((partID) => {
      console.log("CHECK YO FIREBASE FOR NEW ITEM", partID);
      arrayOfKeys.push(partID);
    });
}

console.log("ARRAY OF KEYS", arrayOfKeys);

// function adminEditForm(productData, fb_id){
    
//     return new Promise(function (resolve, reject) {
    
//     let productEditObj = {
//         item_description: productData ? productData.item_description : "",
//         part_num: productData ? productData.part_num : "",
//         price: productData ? productData.price : "",
//     },
    
//     interfaceHtml = ` 
//   <div id="edit-interface-container" >
//     <input class="pn-edit-field" value="${productEditObj.item_description}"type="text" placeholder="Part Number">
//     <input class="descr-edit-field" value="${productEditObj.part_num}"type="text" placeholder="Item Description">
//     <input class="price-edit-field" value="${productEditObj.price}"type="text" placeholder="Price">
//     <button class="save-edits-btn">Save Changes</button>
//     <button class="cancel-edits-btn">Discard Changes</button>
//   </div>
//   `;
        
//     resolve(interfaceHtml);
//     });
//   }

//This function needs to receive the ID of the object being modified in Firebase.
function pushEditsToFB (updatedCard, fb_id) {

  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/products/${fb_id}.json`,
    type: 'PATCH',
    data: JSON.stringify(updatedCard),
    dataType: 'json',
  })
  .done(function() {
    console.log("success");
  });
}



//This function needs to post the changes after the click.... Add Event listeners to capture the values from the fields, then send them to firebase, then update the dom....
// function TEST_FUNCTION () {
 
//   newPn    = editTarget.children('h4').text(editFieldOneVal),
//   newDesc  = editTarget.children('.card-text').text(editFieldTwoVal),
//   newPrice = editTarget.children('.card-price').text(editFieldThrVal);
// }


function deleteFBitems () {
  
  return $.ajax({
    url: `${firebase.getFBsettings().databaseURL}/products.json`,
    type: 'DELETE',
    dataType: 'json',
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
}

module.exports = { pushNewItemToFB,  deleteFBitems, pushEditsToFB };