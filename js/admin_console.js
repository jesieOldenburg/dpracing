"use strict";
console.log("admin here");
let newItemPN = $("#pn-input").val();
let newItemDescription = $("desc-input").val();
let newItemPrice = $("price-input").val();

let signInAuth = require("./user.js");

let newInventoryItem = {
  part_num:"",
  item_description:"",
  price:""
};


$('#admin-login-btn').submit(function(event) {
  signInAuth();
});

module.exports = {
  newInventoryItem
};