const { Pool } = require('pg')
const pool = new Pool({
  host: 'local socket',
  port: 5432,
  user: 'root',
  password: '',
  database: 'overview'
})
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool
  .connect()
  .then(client => {
    return client
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })