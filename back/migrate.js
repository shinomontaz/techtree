const cfg = require('./config.json');
const {migrate} = require("postgres-migrations")

migrate({
    database: cfg.dbName,
    user: cfg.dbUser,
    password: cfg.dbPass,
    host: cfg.dbHost,
    port: cfg.dbPort
  }, "./migrations")
.then(() => {/* ... */})
.catch((err) => {
  console.log(err)
})
