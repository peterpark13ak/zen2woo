const db = require('../database');

const database = new db().connect();

//Define a schema
const Schema = database.Schema;

const ProductsSchema = new Schema({
  'products_id': Number,
  'language_id': Number,
  'products_name': String,
  'products_description': String,
  'products_url': String,
  'products_viewed': String,
  'products_price': String,
  'products_quantity': Number,
  'products_image': String
});

module.exports = ProductsSchema;
