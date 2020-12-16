const db = require('../database');

const database = new db().connect();

//Define a schema
const Schema = database.Schema;

const KeyMapSchema = new Schema({
  'old_id': Number,
  'new_id': Number
});

module.exports = KeyMapSchema;
