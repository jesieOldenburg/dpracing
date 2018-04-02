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

// Set the value of the button the the search query on FOCUS OUT!!!....
$("#admin-search-field").focusout(function(event) {
  event.preventDefault();

  let adminSearchValue = $("#admin-search-field").val();
  
  $("#admin-search-btn").attr('value', adminSearchValue);
  // console.log("button value is?", $("#admin-search-btn").attr("value"));
  return adminSearchValue;
});


//Admin search button El...
$("#admin-search-btn").click(function(event) {
  // event.preventDefault();

  let val = event.currentTarget.value;
  
  db.searchLogic(val);

});

$(document).on("click", ".save-btn", function(event) {
	// event.preventDefault();
	console.log("save me");

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
	// event.preventDefault();
	
	let editTarget = $(this).parent("div");
		editTarget.attr("id", "edit-card-target");
			// console.log("what is edit target", editTarget);
	
	editFormPrinter(editTarget);
})
.then((productData) => {
	var fb_id = productData.data("edit-id");
			console.log("WHAT IS FB ID", fb_id);
	console.log("this be productData", productData);

	db.getProductById(fb_id);
});


function editFBitems (editTarget, fb_id) {

	let editFieldOneVal = $(".pn-edit-field").val(),
		editFieldTwoVal = $(".descr-edit-field").val(),
		editFieldThrVal = $(".price-edit-field").val(),
		updatedCard = createInventoryItem();

	updatedCard.part_num = editFieldTwoVal;
	updatedCard.item_description = editFieldOneVal;
	updatedCard.price = editFieldThrVal;

  console.log("OBJ?>>>>>>>>>>>>>>>>>>>>>>>", updatedCard);       
  console.log("What is the editfieldvalue", editFieldOneVal);
  console.log("What is the editfieldvalue", editFieldTwoVal);
  console.log("What is the editfieldvalue", editFieldThrVal);

adminPage.pushEditsToFB(updatedCard, fb_id);

}




//>>>>>>>>>>>>>>>>>>>>>>>>End Edit Functionality

$(document).on("click", ".delete-btn", function(event) {
  console.log("delete clicked");
  // event.preventDefault();

});
