"use strict";
console.log("admin here");

let firebase = require("./fb-config");
let newItemPN = $("#pn-input").val();
let newItemDescription = $("desc-input").val();
let newItemPrice = $("price-input").val();

let signInAuth = require("./user.js");

let newInventoryItem = {
  part_num:"",
  item_description:"",
  price:""
};


module.exports = {
  newInventoryItem
};