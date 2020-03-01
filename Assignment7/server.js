"use strict"
var express = require("express");
//MISSING LIBRARY CHECK YOUR ERRORS ON THE CONSOLE
var app = express();
var router = express.Router();
const bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.urlencoded({ extended: true }));

router.get("/form", function (req, res) {
    var html = "<form action ='awsdata' method='POST'> <input type='text' name='email' placeholder='email'></input><input type='text' name='password' placeholder='password'></input><input type=submit> </form>"; // Create your html form here
    res.send(html);
})

router.post("/awsdata", function (req, res) {

    var email = req.body.email; // Complete the missing pieces
    var password = req.body.password;// Complete the missing pieces
    let url = "https://mklezvz4g4.execute-api.us-east-2.amazonaws.com/prod?email="+ email + "&password=" + password
    console.log(url);
    request(url, { json: true }, (err, response, body) => {
        console.log(body);
        if (err) { return console.log(err) };
        if (body.Count > 0) {
            //DISPLAY VALID RESPONSE
            console.log('Login Success');
            res.send("Email: " + email + " Password: " + password)
        } else {
            //DISPLAY ERROR RESPONSE
            console.log("Login Not Valid");
            res.redirect("/form"); //allow user to re-enter login
        }
    })
})
app.use("/", router);
app.listen("8080");
