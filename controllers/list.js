var express = require('express');
var router = express.Router();
const CategoriesModel = require('../classes/models/categories');
const ProductsModel = require('../classes/models/products');
const AttributesModel = require('../classes/models/attributes');

/* GET /list listings. */
router.get('/', async (req, res, next) => {
    let categories = [],
      products = [],
      attributes = [];

    await CategoriesModel.find({}, (err, docs) => {
      categories = docs
    });

    await ProductsModel.find({}, (err, docs) => {
      products = docs
    });

    await AttributesModel.find({}, (err, docs) => {
      attributes = docs
    });

    res.send({
      'categories': categories,
      'products': products,
      'attributes': attributes
    })
});

module.exports = router;
