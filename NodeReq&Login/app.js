"use strict"

var fs = require("fs");
var path = require("path");
var http = require("http");
var url = require("url");


var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
//tell express to use EJS
let ejs = require("ejs");

//route requests
const router = express.Router();
var app = express();

//set body parser options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//set templating
app.set("view engine", "ejs");
//forces ejs to use dynamic variables
app.engine("ejs", require("ejs").__express);


router.get("/", function(req,res){
    //as soon as someone calls url '/' this function triggers
    
    //look for and load file
    res.render("index", {pagename:"Home"}) //views/index.ejs
})

router.get("/about", function(req, res){
    res.render("about", {pagename:"About"}) //views/about.ejs
})
router.post("/login", function(req, res){
    console.log(req.body.email); //shows information passed through form via bodyparser
    console.log(req.body.password);
    var errors = [];

    //verify email and password are not blank and pass validation
    if(req.body.email ==""){
        errors.push("Email is required")
    }
    if(req.body.password ==""){
        errors.push("Password is required")
    }
    if(!/"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"/.test(req.body.email)){
        errors.push("Email is not valid");
    }
    if(!/"^([a-zA-Z0-9@*#]{8,15})$"/.test(req.body.password)){
        errors.push("Password is not valid");
    }

    console.log(errors)
    res.render("index", {pagename:"Home",errors:errors});
})

class NewUser{
    constructor(){

    }
}

var failedSub = [];
var successSub = [];
router.post("/subscribe", function(req, res){
    let verified = true; 
    if(req.body.fname==""){
        failedSub.push("first name is required")
        verified = false;
    }
    if(req.body.lname==""){
        failedSub.push("last name is required")
        verified = false;
    }
    if(req.body.address==""){
        failedSub.push("address is required")
        verified = false;
    }
    if(req.body.city==""){
        failedSub.push("city is required")
        verified = false;
    }
    if(req.body.state==""){
        failedSub.push("state is required")
        verified = false;
    }
    if(req.body.zip < 0 ){
        failedSub.push("zip code is required")
        verified = false;
    }
    if(req.body.age == "undefined"){
        failedSub.push("age must be confirmed")
        verified = false;
    }
    if(req.body.terms == "undefined"){
        failedSub.push("terms must be confirmed")
        verified = false;
    }
    if(verified){
        let user = new NewUser();
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.city = req.body.city;
        user.state = req.body.state;
        user.address = req.body.address;
        user.zip = req.body.zip;
        user.gender = req.body.gender;
        user.age = req.body.age;
        user.terms = req.body.terms;
        user.bio  = req.body.bio;
        successSub.push(user)
    }

    res.render("index", {pagename:"Home", failedSub:failedSub, successSub:successSub});
})
app.use(express.static("public"));

app.use("/", router);

//set up server
var server = app.listen("8080")

