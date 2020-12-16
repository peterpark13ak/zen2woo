const db = require('../database');

const database = new db().connect();

//Define a schema
const Schema = database.Schema;

const AttributesSchema = new Schema({
  'id': Number,
  'name': String,
  'slug': String,
  'type': String,
  'order_by': String,
  'has_archives': Boolean,
  'terms': Array
});

module.exports = AttributesSchema;
