"use strict";


let firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");


 // Set the configuration for your app
  // TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyBWHwjjBTpw2kwz5L-h9AWoRrrtF-rKM0k",
    authDomain: "dp-racing.firebaseapp.com",
    databaseURL: "https://dp-racing.firebaseio.com",
    projectId: "dp-racing",
    storageBucket: "dp-racing.appspot.com",
    messagingSenderId: "61578888615"
  };

firebase.initializeApp(config);
var database = firebase.database();

module.exports = firebase;



