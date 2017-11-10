var express = require("express"),
	router 	= express.Router({mergeParams: true});
	
	//MODELS
var	Campground 	= require("../models/campground"),
	Comment 	= require("../models/comment");

	//MIDDLEWARE
var middleware 	= require("../middleware/");


/* ***** GET ROUTES ***** */
	
	//ADD NEW COMMENT FORM
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(error, askedCampground){
		if(!error){
			res.render("comment/newComment", {askedCampground: askedCampground});
		}
	});
	
});

	//EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(error, comment){
		if(!error){
			res.render("comment/edit",{askedCampground_Id: req.params.id, comment: comment});
		}
	});
	
});

/* ***** POST ROUTES ***** */

	//ADD NEW COMMENT
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(error, asked_CG){
		if(!error){
			Comment.create(req.body.comment, function(error, createdComment){
				if(!error){
					createdComment.author.id = req.user._id;
					createdComment.author.username = req.user.username;
					createdComment.save();
					asked_CG.comments.push(createdComment);
					asked_CG.save();
					console.log("Comment as being added to "+req.params.id);
				}else{
					console.log(error);
				}
			});
		}else{
			console.log(error);			
		}

	});
	req.flash("success", "Comment added successfully !");
	res.redirect("/campgrounds/"+req.params.id);
});


/* ***** PUT ROUTES ***** */

	//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, updated_Com){
		if(!error){
			req.flash("success", "Comment updated !");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


/* ***** DELETE ROUTES ***** */

	//DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(error){
		if(!error){
			req.flash("error", "Comment deleted !")
			res.redirect("back");
		}
	});
});



	
module.exports = router;