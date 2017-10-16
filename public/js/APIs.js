$(".flip").click(function(){
		  $("#toggle-panel")


var apiKey = "2a22d190b32c4af7a150ebe7c5c075ef"
var categorySelection = $(this).text();
var source;
var categoryArray = ["business", "entertainment", "gaming", "music", "politics", "science-and-nature", "sports", "technology"]
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
	}
)
});