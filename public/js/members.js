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

 	//Feed on click
  $('#post-submit').on('click', function(event) {
      event.preventDefault();

      var newPost = {
          author: username,
          body: $('#post-field').val().trim(),
          created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      console.log(newPost);

    $.post('api/newFeed', newPost).done(function() {

        var row = $('<div>');
        row.addClass('post');

        row.append("<p>" + newPost.author + " posted: </p>");
        row.append("<p>" + newPost.body + "</p>");
        row.append("<p>At " + moment(newPost.created_at).format("h:mma on dddd") + "</p>");

        $("#post-area").prepend(row);
    	});

	$("#post-field").val("");
	});

    $.get("/api/allFeed", function(data) {

        if (data.length !== 0) {

            for (var i = 0; i < data.length; i++) {

                var row = $("<div>");
                row.addClass("post");

                row.append("<p>" + data[i].author + " posted.. </p>");
                row.append("<p>" + data[i].body + "</p>");
                row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

                $("#post-area").prepend(row);
            }
        }
    });

	var socket = io();

	function setUsername() {
		socket.emit('set-username', username);
	}

	$('#chatForm').submit(function(){
	  event.preventDefault();
	  if ($("#sendMessage").val() == ""){
	  	return false;
	  }
	  socket.emit('chat message', $('#sendMessage').val());
	  $('#sendMessage').val("");
	  return false;
		});

	socket.on('chat message', function(msg){
	  $('#messages').append($('<li>').text(msg.username+": "+msg.message));

	  $("#messages").animate({scrollTop: $('#messages').height()}, 1000);
	});

<<<<<<< HEAD
	console.log('chat script connected')

// let's assume that the client page, once rendered, knows what room it wants to join
	var room = "abc123";

	socket.on('connect', function() {
	   // Connected, let's sign-up for to receive messages for this room
	   socket.emit('room', room);
	});

	socket.on('message', function(data) {
	   console.log('Incoming message:', data);
});
=======
	//Change profile pic script
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.profile-img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function() {
        readURL(this);
    });

    $(".upload-btn").on('click', function() {
        event.preventDefault();
        $(".file-upload").click();
    });
    //End profile pic script
>>>>>>> origin

});