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
        // $(".member-image").attr("src", data.image);
        $(".member-occupation").text(data.occupation);
        $(".member-location").text(data.location);
        $(".member-bio").text(data.bio);
        $(".member-interest1").text(data.interest1);
        $(".member-interest2").text(data.interest2);
        $(".member-interest3").text(data.interest3);
        $(".member-interest4").text(data.interest4);

        console.log(data.interest1);
        console.log(data.interest2);
        console.log(data.interest3);
        console.log(data.interest4);

        if(data.image === null){
          $(".member-image").attr("src", "../images/default-profileIMG.jpg");
        }else{
          $(".member-image").attr("src", data.image);
        }

      });

        //toggle effect when clicking 
        $(".flip").click(function(){
          $("#toggle-panel").slideToggle("slow");
          $("#linkBox").slideToggle("slow");
          $("#chatBox").slideToggle("slow");
          room = $(this).text();
          socket.emit('room', room);


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

        row.append("<p>" + moment(newPost.created_at).format("dddd MMM Do YYYY - h:mma") + "</p>");

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

          row.append("<p>" + moment(data[i].created_at).format("dddd MMM Do YYY h:mma") + "</p>");
          row.append("<strong><p>" + data[i].author + " : </strong>" + data[i].body + "</p>");

          $("#post-area").prepend(row);
      }
    }
  });


  // ======= Socket Chat=======
  var socket = io();

  function setUsername() {
      socket.emit('set-username', username);
  }

  $('#chatForm').submit(function() {
      event.preventDefault();
      if ($("#sendMessage").val() == "") {
          return false;
      }
      socket.emit('chat message', $('#sendMessage').val());
      $('#sendMessage').val("");
      return false;
  });

  socket.on('chat message', function(msg) {
      $('#messages').append($('<li>').text(msg.username + ": " + msg.message));

      $("#messages").animate({
          scrollTop: $('#messages').height()
      }, 1000);
  });


}); //End doc ready

