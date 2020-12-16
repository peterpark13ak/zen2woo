var express = require('express');
var router = express.Router();
const categories = require('../classes/migrate/categories')
const attributes = require('../classes/migrate/attributes')

router.get('/', async (req, res, next) => {
  // const categoriesMigrate = new categories()
  const attributesMigrate = new attributes()

  // await categoriesMigrate.execute()
  await attributesMigrate.execute()
  res.sendStatus(200)
});

module.exports = router;
