require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool ({
  user: process.env.PGUSER,
  host: 'host.docker.internal',
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

module.exports = pool