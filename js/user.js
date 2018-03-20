"use strict";
//install firebase into lib folder npm install firebase --save
let firebase = require("./fb-config"),
  currentUser = null;

//listen for changed state
firebase.auth().onAuthStateChanged((user) => {
  console.log("onAuthStateChanged", user);
  if (user){
    currentUser = user.uid;
    console.log("current user Logged in?", currentUser);
  }else {
    currentUser = null;
    console.log("current user NOT logged in:", currentUser);
  }
});

function loginWithEmail (email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function logInActions() {
  //all firebase functions return a promise!! Add a then when called

}

function getUser(){
  return currentUser;
}

function setUser(val){
  currentUser = val;
}

function logOut(){
  return firebase.auth().signOut();
}
module.exports = {logOut, getUser, setUser, loginWithEmail};
