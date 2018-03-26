"use strict";
console.log("admin here");

let firebase = require("./fb-config");
let signInAuth = require("./user.js");




function pushNewItemToFB (newItemObject) {
  console.log("pushNewItemToFB", newItemObject);
  
  return $.ajax({
  url: `${firebase.getFBsettings().databaseURL}/products.json`,
  type: 'POST',
  data: JSON.stringify(newItemObject),
  dataType: 'json'
  }).done((item) => {
  console.log("CHECK YO FIREBASE FOR NEW ITEM");
 });
}

function editFBitems () {
  
}



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

module.exports = { pushNewItemToFB, editFBitems, deleteFBitems };