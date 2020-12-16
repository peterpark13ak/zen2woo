const AttributesSchema = require('../schema/attributes');
const mongoose = require('mongoose');

const AttributesModel = mongoose.model('attributes', AttributesSchema);

module.exports = AttributesModel;
