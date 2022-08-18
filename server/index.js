const express = require('express');
const db = require('../db/index.js');
const app = express();
const port = 3005;

app.get('/', (req, res) => {
  db.getProducts()
  .then(result =>  res.send(result))
})

app.get('/features', (req, res) => {

})

app.get('/styles', (req, res) => {

})

app.get('/photos', (req, res) => {

})

app.get('/sku', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})