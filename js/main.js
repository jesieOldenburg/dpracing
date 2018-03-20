"use strict";
console.log("Main is here");

var $ = require("jquery");

var adminModifyDB = require("./admin_console");

var user = require('./user');


//FireBase dependencies...
var fetchData = require('./data_calls');
var fbKey = require("./fb-key.js");




/** 
 * Login Button Functionality
 * @
 */

$("#admin-login").on("click", function(event) {
  console.log("CLICK IT");
});