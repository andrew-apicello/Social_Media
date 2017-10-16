var flipped = false;

$(".flip").click(function(){
$("#toggle-panel")

var apiKey = "2a22d190b32c4af7a150ebe7c5c075ef"
var categorySelection = $(this).text();
var source;
var categoryArray = ["business", "entertainment", "gaming", "music", "politics", "science and nature", "sports", "technology"]
var sourceArray = ["the-wall-street-journal","entertainment-weekly","ign","mtv-news","bbc-news","new-scientist","espn","techcrunch"];


for (var i=0;i<categoryArray.length;i++){
	if(categorySelection.toLowerCase() == categoryArray[i]){
		source = String(sourceArray[i]);
	}
};

var url = " https://newsapi.org/v1/articles?source=" + source + "&sortBy=top&apiKey=" + apiKey ;


//pass the name of the category as a this object
$.ajax({
	url: url,
	method: 'GET'
}).done(function(result) {
	console.log(result);

	if (flipped == false){

    var articleOneTitle = $("<h3>");
    articleOneTitle.append(result.articles[0].title);
	$("#articleOne").append(articleOneTitle);
	var articleOneAuthor = $("<h5>");
	articleOneAuthor.append(result.articles[0].author)
	$("#articleOne").append(articleOneAuthor);
	$("#articleOne").append(result.articles[0].description);

    var articleTwoTitle = $("<h3>");
    articleTwoTitle.append(result.articles[1].title);
	$("#articleTwo").append(articleTwoTitle);
	var articleTwoAuthor = $("<h5>");
	articleTwoAuthor.append(result.articles[1].author)
	$("#articleTwo").append(articleTwoAuthor);
	$("#articleTwo").append(result.articles[1].description);

	var articleThreeTitle = $("<h3>");
    articleThreeTitle.append(result.articles[2].title);
	$("#articleThree").append(articleThreeTitle);
	var articleThreeAuthor = $("<h5>");
	articleThreeAuthor.append(result.articles[2].author)
	$("#articleThree").append(articleThreeAuthor);
	$("#articleThree").append(result.articles[2].description);

	flipped = true;
	
	} else {
		$("#articleOne").empty();
		$("#articleTwo").empty();
		$("#articleThree").empty();

		flipped = false;
	}
  }
)
});