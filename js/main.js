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
 * 
 */
function redirectToConsole () {
  window.location ="http://127.0.0.1:8080/html/console.html"; 
}


$("#admin-login").on("click", function(event) {
  redirectToConsole();
});

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//   } else {
//     // No user is signed in.
//   }
// });