// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      occupation: req.body.occupation,
      location: req.body.location,
      interest1: req.body.interest1,
      interest2: req.body.interest2,
      interest3: req.body.interest3,
      interest4: req.body.interest4
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id,
        occupation: req.user.occupation,
        location: req.user.location,
        interest1: req.user.interest1,
        interest2: req.user.interest2,
        interest3: req.user.interest3,
        interest4: req.user.interest4
      });
    }
  });

  app.get("/api/user_data/:name", function(req, res) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    })
    .then(function(result) {
      res.json(result);
    });
  });



 app.get("/api/allFeed", function(req, res) {


        db.Feed.findAll({}).then(function(results) {

            res.json(results);
        });
  });

  app.post("/api/newFeed", function(req, res) {

    console.log("Test-Post Data: ");
    console.log(req.body);

    db.Feed.create({
        author: req.body.author,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function(results){

          res.end();
    })
  });

  app.post("/api/updateInterests", function(req, res) {
    console.log(req.body);
    db.User.update({
      interest1: req.body.interest1
    },{
      where: 
        {id:req.body.id}
    }).then(function() {
      console.log("post got to the server side")

    })
  });


}; //End module.exports