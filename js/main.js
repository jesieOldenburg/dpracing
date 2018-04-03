"use strict";
console.log("Main is here");


let adminPage = require("./admin_console"),
firebase = require("./fb-config"),
user = require("./user"),
db = require("./data_calls"),
fbKey = require("./fb-key.js"),
searchLogic = require("./data_calls");

//FireBase dependencies...

/** This is the constructor function for the new inventory objects being pushed to firebase */

function createInventoryItem () {
  
  let newInventoryItem = {
	part_num: $("#admin-partnumber-input").val(),
	item_description: $("#admin-description-input").val(),
	price:$("#admin-price-input").val()
  };
  return newInventoryItem;
}


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


});

$("#log-out-btn").click(function(e) {

  user.logOut();
});


/** 
 * Event Listener that handles the button to create a new item in the user's database
 * @param  {[type]} event) {             event.preventDefault();  let newItemObject [description]
 * @return {[type]}        [description]
 */


$("#admin-create-btn").click(function(event) {
  event.preventDefault();
  
  let newItemObject = createInventoryItem();
  adminPage.pushNewItemToFB(newItemObject);

});


//Admin search button El...
$("#admin-search-btn").click(function(event) {
    let val = $("#admin-search-field").val();
    console.log("val 1", val);

    $("#admin-search-btn").attr('value', val);
    db.searchLogic();
});

$(document).on("click", ".save-btn", function(event) {
	editFBitems();
});

function editFormPrinter (editTarget) {
  	
    let interfaceHtml = ` 
		<div id="edit-interface-container">
			<input class="pn-edit-field" type="text" placeholder="Part Number">
			<input class="descr-edit-field" type="text" placeholder="Item Description">
			<input class="price-edit-field"type="text" placeholder="Price">
			<button class="save-btn">Save Changes</button>
			<button class="cancel-btn">Discard Changes</button>
		</div>
  `;

 	 $("#edit-card-target").append(interfaceHtml);
}


$(document).on("click", ".edit-btn", function(event) {
    console.log("clicked edit");
	let editTarget = $(this).parent("div");
    editTarget.attr('id', 'edit-card-target');
    console.log("what is the edit target", editTarget);
	editFormPrinter(editTarget);
});


function editFBitems (editTarget) {

	let itemToPushID = $("#edit-card-target").children(".edit-btn").val(),
        editFieldOneVal = $(".pn-edit-field").val(),
        editFieldTwoVal = $(".descr-edit-field").val(),
        editFieldThrVal = $(".price-edit-field").val(),
        updatedCard = createInventoryItem();

        console.log("save me, itemToPushID?", itemToPushID);
	updatedCard.part_num = editFieldOneVal; 
	updatedCard.item_description = editFieldTwoVal;
	updatedCard.price = editFieldThrVal;

  console.log("OBJ?>>>>>>>>>>>>>>>>>>>>>>>", updatedCard);       
  console.log("What is the editfieldvalue", editFieldOneVal);
  console.log("What is the editfieldvalue", editFieldTwoVal);
  console.log("What is the editfieldvalue", editFieldThrVal);

adminPage.pushEditsToFB(updatedCard, itemToPushID);

}


//>>>>>>>>>>>>>>>>>>>>>>>>End Edit Functionality

$(document).on("click", ".delete-btn", function(event) {
  console.log("delete clicked");
  let itemToDELETEId = event.currentTarget.value;
  adminPage.deleteFBitems(itemToDELETEId);
});
