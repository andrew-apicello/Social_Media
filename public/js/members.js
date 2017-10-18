$(document).ready(function() {

var username;
var nsp;
var room;
var linkList = [];
var numLinks = 0;

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
  
  });

//toggle effect when clicking 
$(".flip").click(function(){
  $("#toggle-panel").slideToggle("slow");
  $("#chatBox").slideToggle("slow");
  room = $(this).text();
  socket.emit('room', room);

  });

//Feed on click
$('#post-submit').on('click', function(event) {
  event.preventDefault();
  var postBody = $('#post-field').val().trim();

  if(postBody.indexOf('http://') > -1 || postBody.indexOf('https://') > -1){

    postBody = postBody.link(postBody)

     var newPost = {
      author: username,
      body: postBody,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
  
}
  } else {


  var newPost = {
      author: username,
      body: postBody,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
  
}
}
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
    var linkCount = 0;

  	function setUsername() {
  		socket.emit('set-username', username);
  	}

  	$('#chatForm').submit(function(event){
  	  event.preventDefault(event);
  	  if ($("#sendMessage").val() == ""){
  	  	return false;
  	  }

  	  socket.emit('chat message', $('#sendMessage').val());
  	  $('#sendMessage').val("");
  	  return false;
  		});

      socket.on('chat message', function(msg){
       var chat = msg.message;
       var message;
       
       var link;
       var linkIndex;
       var linkObj = {};

       if(chat.indexOf('http://') > -1 || chat.indexOf('https://') > -1){
        linkCount++;
        linkIndex = chat.indexOf('http');
        link = chat.slice(linkIndex);

        var linkData = $('<li>').html(linkCount + ' ' + msg.username + ': ');
        linkData = linkData.append($('<a>').html(link));
        linkData.addClass('link' + numLinks);
        numLinks++;
        linkObj = {
          name: msg.username,
          link: link
        }
        linkList.push(linkObj);

        $('#link-repo').append(linkData);
        $('#messages').append($('<li>').text(msg.username+": "+msg.message));
        $("#messages").animate({scrollTop: $('#messages').height()}, 1000);
       }

        else {
        $('#messages').append($('<li>').text(msg.username+": "+msg.message));
        $("#messages").animate({scrollTop: $('#messages').height()}, 1000);
       }
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

  $('#link-repo-searchbar').keyup(function(){
    var input = $('#link-repo-searchbar').val();
   

    if (linkList.length < 1) {
      alert('nothing to search!');
      return false;
    }

    var filter = input.toLowerCase();
    var links;
    var name;
    var messageLink;

      for (var i = 0; i < linkList.length; i++) {
        
        var name = linkList[i].name.toLowerCase();
        var messageLink = linkList[i].link.toLowerCase();
        var targetLink;

        if (name.indexOf(filter) > -1 || messageLink.indexOf(filter) > -1) {
    
          console.log('link present');
          $('.link' + i).css('display', '');
        } else {
          console.log('no link present');
          $('.link' + i).css('display', 'none');
        }
      }

  });

});




















 //End doc ready