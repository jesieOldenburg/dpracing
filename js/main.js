"use strict";
console.log("Main is here");


let adminModifyDB = require("./admin_console"),
user = require('./user');

//FireBase dependencies...
var fetchData = require('./data_calls');
var fbKey = require("./fb-key.js");


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

  window.location.href = "../index.html";
});
  
