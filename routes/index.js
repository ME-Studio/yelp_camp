var passport = require("passport"),
	express = require("express"),
	router 	= express.Router();
	

		//MODELS
var User = require("../models/user");

		//MIDDLEWARE
var middleware 	= require("../middleware/");

/* ***** GET ROUTES ***** */
		
		//HOMEPAGE 
router.get("/", function(req,res){
	res.render("homePage");
});

		//AUTH REGISTERATION FORM
router.get("/register", function(req, res){
	res.render("user/register");
});

		//AUTH LOGIN FORM
router.get("/login", function(req, res){
	res.render("user/login");
});

		//AUTH LOGOUT
router.get("/logout", middleware.isLoggedIn, function(req, res){
	req.logout();
	req.flash("error", "You've being logged out !");
	res.redirect("/");
});


/* ***** POST ROUTES ***** */

		//ADD NEW USER (REGISTERATION)
router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(error, user){
		if(error){
			console.log(error);
			req.flash("error", error.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp "+req.body.username+" .");
			res.redirect("/campgrounds");
			console.log("User registered successfully !");
		});

	});
});

		//USER LOGIN
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
	req.flash("success", "Logged in successfully !");
	console.log("User logged in successfully");
});




module.exports = router;
