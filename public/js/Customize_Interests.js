
$(".interestEdit").click(function(){

  var categorySelection = $(this).text();

  console.log(categorySelection);

  var id;

  $.get("/api/user_data").then(function(data) {
    id = data.id;
    $.post("/api/updateInterests", {
      id: id,
      interest1: categorySelection
    }).then(function(data) {
      // getrequest
      console.log("success")

    })

  })

});