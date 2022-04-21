const express = require("express"); 
const app = express(); 
require("dotenv").config();

const cors = require("cors");
const PORT = process.env.PORT;

app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to your App!");
});

app.listen(PORT, () => {
    console.log(`Your app is running at ${PORT}`);
});


module.exports = app;

