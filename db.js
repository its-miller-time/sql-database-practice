//Import the dotenv module
//call its config method

require('dotenv').config();

const pgp = require('pg-promise')({
    //logs sql queries to the console
    query: (e) => console.log(e.query)
});
const db  = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

console.log('yay you did the thing');

module.exports = db;