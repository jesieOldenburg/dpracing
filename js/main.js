"use strict";
console.log("Main is here");


let adminModifyDB = require("./admin_console"),
user = require("./user"),
db = require("./data_calls"),
dataHighway = require("./data_calls");
//FireBase dependencies...

var fbKey = require("./fb-key.js");

/** This is the constructor function for the new inventory objects being pushed to firebase */


function createInventoryItem () {
  
  let newInventoryItem = {
    part_num: $("#admin-partnumber-input").val(),
    item_description: $("#admin-description-input").val(),
    price:$("#admin-price-input").val()
  };
  return newInventoryItem;
}




/** 
 * Login Button Functionality
 */

$("#admin-login-btn").on("click", function(e) {
  console.log("what is e ?", e);
  e.preventDefault();
  var userEmail = $("#login-email").val();
  console.log("what is the user email?", userEmail);
  
  var userPassword = $("#login-pass").val();

  user.loginWithEmail(userEmail, userPassword);

  // window.location.href = "../index.html";
});

$("#log-out-btn").click(function(e) {

  user.logOut();
});


/** 
 * Event Listener that handles the button to create a new item in the user's database
 * @param  {[type]} event) {             event.preventDefault();  let newItemObject [description]
 * @return {[type]}        [description]
 */


$("#admin-create-btn").click(function(event) {
  event.preventDefault();
  
  let newItemObject = createInventoryItem();
  adminModifyDB.pushNewItemToFB(newItemObject);
});
