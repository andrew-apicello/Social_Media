$(document).ready(function() {

var username;

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
  	username = data.name;
  	setUsername();
    $(".member-name").text(data.name);
    $(".member-occupation").text(data.occupation);
    $(".member-location").text(data.location);
    $(".member-interest1").text(data.interest1);
    $(".member-interest2").text(data.interest2);
    $(".member-interest3").text(data.interest3);
    $(".member-interest4").text(data.interest4);

    console.log(data.interest1);
    console.log(data.interest2);
    console.log(data.interest3);
    console.log(data.interest4);

		//toggle effect when clicking 
		$(".flip").click(function(){
		  $("#toggle-panel").slideToggle("slow");
		  $("#chatBox").slideToggle("slow");
		});

		$("#search-btn").click(function(){
			event.preventDefault();
			var userNameSearch = $("#search-bar").val().trim();
			console.log("You searched for " + userNameSearch);
		});    

	});

  var nbOptions = 4; // number of menus
	var angleStart = -360; // start angle
 
		// jquery rotate animation
		function rotate(li,d) {
		  $({d:angleStart}).animate({d:d}, {
		   step: function(now) {
		    $(li)
		      .css({ transform: 'rotate('+now+'deg)' })
		      .find('label')
		       .css({ transform: 'rotate('+(-now)+'deg)' });
		   }, duration: 0
		  });
		}
 
		// show / hide the options
		function toggleOptions(s) {
		  $(s).toggleClass('open');
		  var li = $(s).find('li');
		  var deg = $(s).hasClass('half') ? 180/(li.length-1) : 360/li.length;
		  for(var i=0; i<li.length; i++) {
		   var d = $(s).hasClass('half') ? (i*deg)-90 : i*deg;
		   $(s).hasClass('open') ? rotate(li[i],d) : rotate(li[i],angleStart);
		  }
		}
 
		$('.selector button').click(function(e) {
		  toggleOptions($(this).parent());
		});
		 
		setTimeout(function() { toggleOptions('.selector'); }, 100);

 
	var socket = io();

	function setUsername() {
		console.log("Before socket.emit:"+username)
		socket.emit('set-username', username);	
	}

	$('#chatForm').submit(function(){
	  event.preventDefault();
	  socket.emit('chat message', $('#sendMessage').val());
	  $('#sendMessage').val('');
	  return false;
		});

	socket.on('chat message', function(msg){
	  $('#messages').append($('<li>').text(msg.username+": "+msg.message));

	  $("#messages").animate({scrollTop: $('#messages').height()}, 1000);
	});

});