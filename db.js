const Pool = require('pg').Pool;

// подключение к postgres
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'litegraphdb',
});

module.exports = pool;
