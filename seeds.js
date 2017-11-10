var mongoose = require("mongoose");

//MODELS
var Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    User         = require("./models/user");

var desc = "Sriracha YOLO ennui hella VHS narwhal roof party. Franzen intelligentsia keytar waistcoat craft beer humblebrag. Neutra jianbing flexitarian bushwick, venmo austin poutine pinterest polaroid kale chips artisan. YOLO truffaut chartreuse bicycle rights leggings hashtag hoodie butcher bushwick church-key hell of. Leggings health goth brunch crucifix, sriracha disrupt biodiesel af meditation edison bulb thundercats pop-up pork belly portland. Tousled vaporware mixtape art party cronut, copper mug jianbing hexagon blog distillery air plant tacos. Kinfolk chambray green juice 90's cronut art party ramps williamsburg roof party offal seitan.";

var data = [
	{name: "Auroville", image: "https://source.unsplash.com/FQ96bh4O1tY", description: desc},
	{name: "Adabettu", image: "https://source.unsplash.com/2DH-qMX6M4E", description: desc},
	{name: "Feels Snow", image: "https://source.unsplash.com/f5sdemaT7XE", description: desc},
	{name: "Lake Vally", image: "https://source.unsplash.com/1azAjl8FTnU", description: desc}
	
];

var dataComment = {
	text: "This is the place to chill your bones",
	author: "Yourself"
};

var seedDB = function(){
	//Remove all campground
	Campground.remove({}, function(error){
		// if(!error){
		// 	console.log("****** SEED STARTS ******");
		// 	console.log("All campgrounds as being removed");
		// 	//ForEach on data
		// 	data.forEach(function(seed){
		// 		//Create campgrounds
		// 		Campground.create(seed, function(error, created_CG){
		// 			if(!error){
		// 				console.log("Campground as being added");
		// 				//Create comments
		// 				Comment.create(dataComment, function(error, created_comment){
		// 					if(!error){
		// 						//Add comnments to campgrounds
		// 						created_CG.comments.push(created_comment);
		// 						created_CG.save();
		// 						console.log("Comment as being added to the campground");
		// 					}

		// 				});
		// 			}
		// 		});
		// 	});
			
		// }
	});
	
}

module.exports = seedDB;

