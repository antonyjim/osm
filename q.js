const mysql = require('mysql')

const poolConfig = {
  host: 'hpl.dev',
  user: 'remote_node',
  password: 'development',
  database: 'thq',
  connectionLimit: parseInt(process.env.DB_POOL_LIMIT, 10) || 1
}

const pool = mysql.createPool(poolConfig)

module.exports = async function (query, params) {
  return new Promise(resolve => {
    pool.query(query, params, (err, results) => {
      if (err) resolve(err)
      console.table(results)
      resolve(results)
    })
  })
}