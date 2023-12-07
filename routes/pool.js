const { Pool } = require('pg')
const pool = new Pool({
    user: 'gleeuedh',
    host: 'tyke.db.elephantsql.com',
    database: 'gleeuedh',
    password: '7ivoRh1NVV1LJmOmP9B4qhc4bNi7Vb4p',
    port: 5432,
    max:30,
    idleTimeoutMillis: 1000
})



module.exports = pool;
