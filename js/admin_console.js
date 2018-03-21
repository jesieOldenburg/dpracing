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

function newItemValues (Object) {
  newInventoryItem.part_num = $("#new-part-num-field").val();
  newInventoryItem.item_description = $("#new-item-description-field").val();
  newInventoryItem.price = $("#new-item-price-field").val();
}

function addProduct (newInventoryItem) {
    return $.ajax({
      url: "",
      type: 'POST',
      data: JSON.stringify(newInventoryItem),
      dataType: 'json'
   }).done((item) => {
     // body... 
   });
} 

module.exports = {
  newInventoryItem
};