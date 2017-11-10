var express 	= require("express"),
	router 		= express.Router();
		
		//MODELS	
var Campground 	= require("../models/campground");

		//MIDDLEWARE
var middleware 	= require("../middleware/");


/* ***** GET ROUTES ***** */

		//LIST ALL CAMPGROUNDS
router.get("/", function(req,res){
	Campground.find({}, function(error, AllCampgrounds){
		if(error){
			console.log("Oops ! There is a error while rendering campgrounds");
		}
		else{
			res.render("campground/campgrounds", {campgrounds:AllCampgrounds});
		}
	});
	
});

		//ADD NEW CAMPGROUND FORM
router.get("/newCampground", middleware.isLoggedIn, function(req,res){
	res.render("campground/newCampground");
});

		//DISPLAY A CAMPGROUND (MORE INFO)
router.get("/:id", function(req,res){
	
	Campground.findById(req.params.id).populate("comments").exec(function(error, askedCampground){
		if(error){
			console.log("There is an error displaying more info");
		}
		else{
			res.render("campground/show",{askedCampground: askedCampground});
		}
	});

});

		//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(error, askedCampground){
		if(!error){
			res.render("campground/edit", {askedCampground: askedCampground});	
		}
	});
	
});


/* ***** POST ROUTES ***** */

		//ADD NEW CAMPGROUND
router.post("/", middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: description, author: author};
	
	Campground.create(newCampground, function(error, campground){
			if(error){
				console.log("Oops ! There is an error");
			}
			else{
				console.log("Campground as being added for "+campground);
			}
	});
	req.flash("success", "Campground added successfully !");
	res.redirect("/campgrounds");
});


/* ***** PUT ROUTES ***** */

		//UPDATING CAMPGROUND
router.put("/:id", function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.edited_CG, function(error, Updated_CG){
		if(!error){
			req.flash("success", "Campground Updated !");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


/* ***** DESTROY ROUTES ***** */

		//DELETE THE CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(error){
		if(!error){
			req.flash("error", "Campground deleted !");
			res.redirect("/campgrounds");
			console.log("Deleted");	
		}
	});
});



	
module.exports = router; 