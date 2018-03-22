"use strict";
console.log("admin here");

let firebase = require("./fb-config");
let signInAuth = require("./user.js");

let fbRemoteDB = firebase.database().ref("products/");


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
  // body...
}

function deleteFBitems () {
  // body... 
}

module.exports = { pushNewItemToFB, editFBitems, deleteFBitems };