var express = require("express");
const path = require('path')
const bodyParser = require('body-parser')
var app = express();
var admin = require("firebase-admin");

var serviceAccount = require("./ikionline-7bfef-firebase-adminsdk-h2us1-5921740207.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ikionline-7bfef-default-rtdb.firebaseio.com"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const insertproduk = require('./route/register_warung')
app.use('/ikiwarung/', insertproduk);



app.listen(3000, () => {
 console.log("Server running on port 3000");
});



module.exports = app;