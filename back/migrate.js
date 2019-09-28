require('dotenv').config()

const {migrate} = require("postgres-migrations")
const params = {
    database: process.env.dbName,
    user: process.env.dbUser,
    password: process.env.dbPass,
    host: process.env.dbHost,
    port: parseInt(process.env.dbPort),
  };

migrate(params, "./migrations")
.then(() => {/* ... */})
.catch((err) => {
  console.log(params)
  console.log(err)
})
