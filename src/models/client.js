const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Pool({
    user: process.env.PG_USER,
    host:process.env.PGe_HOST,
    database:process.env.PG_DATABASE,
    password: process.env.PG_PASS, 
    port:process.env.PG_PORT,
    max:20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})



module.exports = client;