var middlewareObj = {};

	//MODELS
var	Campground 	= require("../models/campground"),
	Comment 	= require("../models/comment");

//To check whether the user is loggedIN (Middleware)
middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please! Login to continue");
	res.redirect("/login");
}

//To check campground ownership (Edit, delete)
middlewareObj.checkCampgroundOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(error, found_CG){
			if(!error){
				if(found_CG.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}else{
				req.flash("error", "Campground not found");
			}
		});
	}else{
		req.flash("error", "Please! Loggin to continue");
		res.redirect("back");
	}
}

//To check comment ownership (Edit, delete)
middlewareObj.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(error, found_Com){
			if(!error){
				if(found_Com.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}else{
				req.flash("error", "Comment not found");
			}
		});
	}else{
		req.flash("error", "Please! Loggin to continue");
		res.redirect("back");
	}
} 



module.exports = middlewareObj





		
