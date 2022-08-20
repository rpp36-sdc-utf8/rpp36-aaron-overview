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
      .query('SELECT * FROM products limit 5')
      .then(res => {
        client.release()
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

const getProductId = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`
      SELECT products.*, json_agg(json_build_object('feature', product_features.feature, 'value', product_features.value)) AS features
      FROM products
      JOIN product_features ON products.id = ${id} AND product_features.product_id = ${id}
      GROUP BY products.id
      `)
      .then(res => {
        client.release()
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

/*
      SELECT product_styles.id AS style_id, name, original_price, sale_price, default_style AS "default?",
      json_agg(json_build_object('thumbnail_url', styles_photos.thumbnail_url, 'url', styles_photos.url)) AS photos,
      json_agg(json_build_object('feature', product_features.feature)) AS features
      FROM product_styles
      JOIN styles_photos ON product_styles.productid = ${id} AND styles_photos.styleid = product_styles.id
      JOIN product_features ON product_styles.id = ${id} AND product_features.product_id = ${id}
      GROUP BY product_styles.id
*/

const getProductStyles = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`
      SELECT products.id AS product_id
      FROM products
      WHERE products.id = ${id}
      `)
      .then(res => {
        client.release()
        console.log('CURRENT RESULTS: ', res.rows);
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

const getFeatures = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * FROM product_features WHERE product_id = ${id} limit 5`)
      .then(res => {
        client.release()
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

const getStyles = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * FROM product_styles WHERE productId = ${id} limit 5`)
      .then(res => {
        client.release()
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

const getPhotos = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * FROM styles_photos WHERE styleId = ${id}`)
      .then(res => {
        client.release()
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

const getSku = function(id) {
  return pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * FROM styles_sku WHERE styleId = ${id} limit 5`)
      .then(res => {
        client.release()
        return res.rows;
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })
}

module.exports = {
  getProducts,
  getProductId,
  getProductStyles,
  getFeatures,
  getStyles,
  getPhotos,
  getSku
}