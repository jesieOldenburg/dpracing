"use strict";

let newItemPN = $("#pn-input").val();
let newItemDescription = $("desc-input").val();
let newItemPrice = $("price-input").val();

// var databaseAccess = firebase.database();

let newInventoryItem = {
  part_num:"",
  item_description:"",
  price:""
};