const express = require("express"); 
const app = express(); 
const bookController = require('./controllers/bookController');


app.use('/books', bookController);


module.exports = app;

