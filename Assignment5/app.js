"use strict"

var fs = require("fs");
var path = require("path");
var http = require("http");
var url = require("url");


var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

const session = require("express-session");

//tell express to use EJS
let ejs = require("ejs");

//route requests
const router = express.Router();
var app = express();


//set up session
app.use(session({ secret: "secret", saveUninitialized: true, resave: true }))

var sess;

//set body parser options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set templating
app.set("view engine", "ejs");
//forces ejs to use dynamic variables
app.engine("ejs", require("ejs").__express);


router.get("/", function (req, res) {
    //as soon as someone calls url '/' this function triggers

    //initialize blank session
    sess = req.session;

    //look for and load file
    res.render("index", { pagename: "Home", sess: sess }) //views/index.ejs
})

router.get("/about", function (req, res) {

    sess = req.session;
    res.render("about", { pagename: "About", sess: sess }) //views/about.ejs
})
router.post("/login", function (req, res) {
    console.log(req.body.email); //shows information passed through form via bodyparser
    console.log(req.body.password);
    var errors = [];

    //verify email and password are not blank and pass validation
    if (req.body.email == "") {
        errors.push("Email is required")
    }
    if (req.body.password == "") {
        errors.push("Password is required")
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        errors.push("Email is not valid");
    }
    if (!/^([a-zA-Z0-9@*#]{8,15})$/.test(req.body.password)) {
        errors.push("Password is not valid");
    }
    let valid = false;

    if(req.body.email =="mike@aol.com" && req.body.password=="abc123"){
        valid = true;
    }
    //validate username and password are active
    if (valid) {
        sess = req.session;
        sess.loggedin = true;
        res.render("profile", { pagename: "Profile", sess:sess})
    } else {
        sess = req.session;
        sess.loggedin = false;
        res.render("index", {pagename: "Home", errors:errors});
    }
})
router.get("/profile", function (req, res) {
    sess = req.session;
    if (typeof (sess) == "undefined" || sess.loggedin != true) {
        var errors = ["User not authenticated"];
        res.render("index", { pagename: "Home", errors: errors })
    } else {
        res.render("profile", { pagename: "Profile", sess: sess })
    }
})

router.get("/logout", function (req, res) {
    sess = req.session;
    sess.destroy(function (err) {
        res.redirect("/");
    })
})
app.use(express.static("public"));

app.use("/", router);

//set up server
var server = app.listen("8080")

