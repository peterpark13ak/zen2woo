 //Require Mongoose
const productsModelSchema = require('../schema/products');
const mongoose = require('mongoose');

const ProductsModel = mongoose.model('products', productsModelSchema);

module.exports = ProductsModel;
