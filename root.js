var passportLocalMongoose 	= require("passport-local-mongoose"),
	localStrategy    		= require("passport-local"),
	expressSession   		= require("express-session"),
	methodOverride			= require("method-override"),
	bodyParser   			= require("body-parser"),
	passport         		= require("passport"),
	mongoose     			= require("mongoose"),
    express      			= require("express"),
    request      			= require("request"),
    flash					= require("connect-flash"),
    app          			= express();

//SEED
var seedDB       = require("./seeds");

//MODLES 
var Campground   = require("./models/campground"),
    Comment      = require("./models/comment"),
    User         = require("./models/user");

//ROUTES
var campgroundRoutes  	= require("./routes/campground"),
	commentRoutes 		= require("./routes/comment"),
	indexRoutes 		= require("./routes/index");


/* ****** EXPRESS CONTENTS ****** */
app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());


/* ****** PASSPORT CONTENTS ****** */
	//EXPRESS SESSION
app.use(expressSession({
	secret: "Yankee is ma love ma life ma soul",
	resave: false,
	saveUninitialized: false
}));
	
	//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//SEED FUNCTIONS
//seedDB();

//It will add this middleware to all routes (PASSES USER DATA)
app.use(function(req, res, next){
   res.locals.currentUser 	= req.user;
   res.locals.success		= req.flash("success");
   res.locals.error			= req.flash("error");
   next();
});

//USING THE ROUTES
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comment", commentRoutes);



/* ****** SERVER CONNECTIONS ****** */ 

app.listen(process.env.PORT,process.env.IP, function(){
	console.log("YelpCamp server as being started on the PORT: 8080");
});

	//MongoDB connection
mongoose.connect("DATABASEURL", {useMongoClient: true});
