const categoriesModelSchema = require('../schema/categories');
const mongoose = require('mongoose');

const CategoriesModel = mongoose.model('categories', categoriesModelSchema);

module.exports = CategoriesModel;
