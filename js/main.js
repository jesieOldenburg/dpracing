"use strict";
console.log("Main is here");

let fetchData = require('./data_calls');

let listeners =require ('./listeners');

let config = require('./fb-config');

let user = require('./user');

let adminModifyDB = require("./admin_console");

document.getElementById("login").addEventListener('click', function (e) {
  // body... 
  console.log("you clicked login button");
});

$("#landing-cta-btn").click(function(event) {
  console.log("clickety click");
});
