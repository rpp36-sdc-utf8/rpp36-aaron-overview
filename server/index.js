const express = require('express');
const db = require('../db/index.js');
const app = express();

app.get ('/loaderio-48905dca49dfb6fde03eaba18c33b56a.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'loaderio.txt'))
})

app.get('/test', (req, res) => {
  res.send('this is working')
})

app.get('/', (req, res) => {
  db.getProducts()
  .then(result => res.send(result))
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  })
})

app.get('/products', (req, res) => {
  db.getProducts()
  .then(result => res.send(result))
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  })
})

app.get('/products/:product_id', (req, res) => {
  let id = req.params.product_id;
  db.getProductId(id)
  .then(result => res.send(result))
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  let id = req.params.product_id;
  db.getProductStyles(id)
  .then(result => res.send(result))
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  })
})

// app.get('/features', (req, res) => {
//   db.getFeatures(1)
//   .then(result => res.send(result))
// })

// app.get('/styles', (req, res) => {
//   db.getStyles(1)
//   .then(result => res.send(result))
// })

// app.get('/photos', (req, res) => {
//   db.getPhotos(1)
//   .then(result => res.send(result))
// })

// app.get('/sku', (req, res) => {
//   db.getSku(1)
//   .then(result => res.send(result))
// })

module.exports = app;