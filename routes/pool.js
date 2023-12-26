const { Pool } = require('pg')
const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
    max:30,
    idleTimeoutMillis: 1000
})



module.exports = pool;
