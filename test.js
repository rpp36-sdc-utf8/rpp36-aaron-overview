const db = require('./db');
const server = require('./server');
const supertest = require('supertest');

const request = supertest(server);

describe('Test server routes', () => {
  test('/products should return status code 200', () => (
    request
      .get('/products')
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
  ));
  test('/products should return 5 items', () => (
    request
      .get('/products')
      .then(response => {
        expect(response.body.length).toBe(5);
      })
  ));
  test('/products should contain the correct schema', () => (
    request
      .get('/products')
      .then(response => {
        expect(Object.keys(response.body[0])).toEqual(expect.arrayContaining(["id", "name", "slogan", "description", "category", "default_price"]));
      })
  ));
  test('/products/:product_id should return status code 200', () => (
    request
      .get('/products/71701')
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
  ));
  test('/products/:product_id should contain features', () => (
    request
      .get('/products/71702')
      .then(response => {
        expect(Object.keys(response.body).includes('features')).toBe(true);
      })
  ));
  test('/products/:product_id should contain the correct schema', () => (
    request
      .get('/products/71703')
      .then(response => {
        expect(Object.keys(response.body)).toEqual(expect.arrayContaining(["id", "name", "slogan", "description", "category", "default_price", "features"]));
      })
  ));
  test('/products/:product_id/styles should return status code 200', () => (
    request
      .get('/products/71705/styles')
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
  ));
  test('/products/:product_id/styles should contain the correct schema', () => (
    request
      .get('/products/71706/styles')
      .then(response => {
        expect(Object.keys(response.body)).toEqual(expect.arrayContaining(["product_id", "results"]));
      })
  ));
  test('/products/:product_id/styles nested array should contain the correct schema', () => (
    request
      .get('/products/71708/styles')
      .then(response => {
        expect(Object.keys(response.body["results"][0])).toEqual(expect.arrayContaining(["style_id", "name", "original_price", "sale_price", "default?", "photos", "skus"]))
      })
  ))
});

afterAll(() => db.pool.end());
