"use strict";


let firebase = require("firebase/app"),
  fb = require("./fb-key"),
  fbData = fb();
  
  require("firebase/auth");
  require("firebase/database");


 // Set the configuration for your app
  // TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyBWHwjjBTpw2kwz5L-h9AWoRrrtF-rKM0k",
    authDomain: "dp-racing.firebaseapp.com",
    databaseURL: "https://dp-racing.firebaseio.com",
  };

firebase.initializeApp(config);
var database = firebase.database();

firebase.getFBsettings = () => {
  console.log("getFBsettings", config);
  return config;
};

module.exports = firebase;


