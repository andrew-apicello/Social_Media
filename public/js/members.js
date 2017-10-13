$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.name);

  });  

  var nbOptions = 5; // number of menus
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
  
});

