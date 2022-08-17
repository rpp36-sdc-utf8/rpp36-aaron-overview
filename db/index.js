const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'aaronwang',
  database: 'overview'
})
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const getProducts = function() {
  return pool
  .connect()
  .then(client => {
    return client
      .query('SELECT * FROM products limit 8')
      .then(res => {
        client.release()
        console.log('RESULTS: ', res.rows)
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

module.exports = {
  getProducts
}