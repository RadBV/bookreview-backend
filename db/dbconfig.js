require("dotenv").config();
const pgp = require('pg-promise')(); //npm install pg-promise

const databaseURL = process.env.DEV_DB; //set this variable in .env

const cn = {
    connectionString : databaseURL,
    allowExitOnIdle: true,
    max: 30,

}

const db = pgp(cn);

module.exports = db; 