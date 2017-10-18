$(document).ready(function() {

var username;
var nsp;
var room;

// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
	username = data.name;
	setUsername();
  $(".member-name").text(data.name);
  $(".member-image").attr("src", data.image);
  $(".member-occupation").text(data.occupation);
  $(".member-location").text(data.location);
  $(".member-bio").text(data.bio);
  $(".member-interest1").text(data.interest1);
  $(".member-interest2").text(data.interest2);
  $(".member-interest3").text(data.interest3);
  $(".member-interest4").text(data.interest4);

  if(data.image === null){
          $(".member-image").attr("src", "../images/default-profileIMG.jpg");
        }else{
          $(".member-image").attr("src", data.image);
        }

  //interest 1
  if(data.interest1 == "Music"){
    $("#interest1").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
   } 
  else if(data.interest1 == "Entertainment"){
    $("#interest1").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Gaming"){
    $("#interest1").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Science and Nature"){
    $("#interest1").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Business"){
    $("#interest1").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Politics"){
    $("#interest1").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Sports"){
    $("#interest1").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest1 == "Technology"){
    $("#interest1").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

//interest 2

if(data.interest2 == "Music"){
    $("#interest2").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Entertainment"){
    $("#interest2").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Gaming"){
    $("#interest2").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Science and Nature"){
    $("#interest2").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Business"){
    $("#interest2").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Politics"){
    $("#interest2").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Sports"){
    $("#interest2").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest2 == "Technology"){
    $("#interest2").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

//interest 3

if(data.interest3 == "Music"){
    $("#interest3").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Entertainment"){
    $("#interest3").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Gaming"){
    $("#interest3").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Science and Nature"){
    $("#interest3").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Business"){
    $("#interest3").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Politics"){
    $("#interest3").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Sports"){
    $("#interest3").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest3 == "Technology"){
    $("#interest3").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

//interest 4

if(data.interest4 == "Music"){
    $("#interest4").css({"background": "url(/images/musicturntable.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Entertainment"){
    $("#interest4").css({"background": "url(/images/emmys.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Gaming"){
    $("#interest4").css({"background": "url(/images/gaming.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Science and Nature"){
    $("#interest4").css({"background": "url(/images/patternal.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Business"){
    $("#interest4").css({"background": "url(/images/stockmarket.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Politics"){
    $("#interest4").css({"background": "url(/images/flag.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Sports"){
    $("#interest4").css({"background": "url(/images/football.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  } else if(data.interest4 == "Technology"){
    $("#interest4").css({"background": "url(/images/matrix.gif)",
  "background-repeat": "no-repeat",
  "background-position": "center center",
  "background-size": "150px 150px"});
  }

});

//toggle effect when clicking 
$(".flip").click(function(){
  if (flipped == false){
  $("#toggle-panel").slideToggle("slow");
  $("#chatBox").slideToggle("slow");
  $("#linkBox").slideToggle("slow");
  room = $(this).text();
  socket.emit('room', room);

  $.get("/api/all"+room, function(data) {

    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
          $('#messages').append($('<li>').text(moment(data[i].created_at).format("(h:mm a) ")+data[i].author+": "+data[i].body));
          $("#messages").animate({scrollTop: $('#messages').height()}, 1000);
        }
      }
    });
  }
});

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

      row.append("<p>" + moment(newPost.created_at).format("dddd MMM Do YYYY - h:mma:") + "</p>");

      row.append("<strong><p>" + newPost.author + ": </strong>" + newPost.body + "</p>");

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

  // ============ Socket Chat ===============
  	var socket = io.connect();

  	function setUsername() {
  		socket.emit('set-username', username);
  	}

  	$('#chatForm').submit(function(event){
  	  event.preventDefault(event);
  	  if ($("#sendMessage").val() == ""){
  	  	return false;
  	  }

      var newChat = {
      author: username,
      body: $('#sendMessage').val().trim(),
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      $.post('api/new'+room, newChat);

  	  socket.emit('chat message', $('#sendMessage').val());
  	  $('#sendMessage').val("");
  	  return false;
  		});

  socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(moment().format("(h:mm a) ")+msg.username+": "+msg.message));
  $("#messages").animate({scrollTop: $('#messages').height()}, 1000);
  });

  //Change profile pic script
  var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function(e) {
              $('.profile-img').attr('src', e.target.result);
              storePicture(e);
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

  function storePicture(target){

    // send target to database

  }

}); //End doc ready