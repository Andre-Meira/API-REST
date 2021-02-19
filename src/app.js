const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//call Routers
require("./controllers/authController")(app);;

module.exports = app;