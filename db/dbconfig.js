require("dotenv").config();
const pgp = require('pg-promise')(); 

const databaseURL = process.env.DB_URL; 

const cn = {
    connectionString : databaseURL,
    allowExitOnIdle: true,
    max: 30,
    ssl: false
}

const db = pgp(cn);

module.exports = db; 