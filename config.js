require('dotenv').config();

var { Pool } = require('pg');
var isProduction = process.env.NODE_ENV === 'production'
var connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

var pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
	ssl: { rejectUnauthorized: false },
})

module.exports = { pool };