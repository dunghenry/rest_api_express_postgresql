const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'students',
    password: process.env.PASSWORD,
    port: 5432
})

module.exports = pool;