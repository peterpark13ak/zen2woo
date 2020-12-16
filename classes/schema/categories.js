const db = require('../database');

const database = new db().connect();

//Define a schema
const Schema = database.Schema;

const CategoriesSchema = new Schema({
  'id': Number,
  'parent': Number,
  'menu_order': Number,
  'name': String,
  'description': String,
  'display': String
});

module.exports = CategoriesSchema;
