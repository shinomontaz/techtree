const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.dbUser,
  host: process.env.dbHost,
  database: process.env.dbName,
  password: process.env.dbPass,
  port: process.env.dbPort,
})

module.exports = {
  pool
}
