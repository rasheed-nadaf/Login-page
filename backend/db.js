const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'auth_db',
    password: 'Sonu@web',
    port: 5432,
});

module.exports = pool;
