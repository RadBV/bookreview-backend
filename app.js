const express = require("express"); 
const app = express(); 
const bodyParser = require('body-parser')
const bookController = require('./controllers/bookController');
const cors = require("cors");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/books', bookController);


module.exports = app;

