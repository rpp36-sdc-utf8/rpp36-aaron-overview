const express = require('express');
const db = require('../db/index.js');
const app = express();
const port = 3005;

app.get('/', (req, res) => {
  db.getProducts()
  .then(result => res.send(result))
})

app.get('/features', (req, res) => {
  db.getFeatures(1)
  .then(result => res.send(result))
})

app.get('/styles', (req, res) => {
  db.getStyles(1)
  .then(result => res.send(result))
})

app.get('/photos', (req, res) => {
  db.getPhotos(1)
  .then(result => res.send(result))
})

app.get('/sku', (req, res) => {
  db.getSku(1)
  .then(result => res.send(result))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})