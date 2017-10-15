$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);

	   //toggle effect when clicking 
	  $(".flip").click(function(){
	      $("#toggle-panel").slideToggle("slow");
	  });

	  $("#search-btn").click(function(){

	  	var userNameSearch = $("#search-bar").val().trim();

	  	console.log("You searched for " + userNameSearch);

	  });

  });  
  
}); //End doc ready

