var async = require("async");
const ProductsModel = require('../models/products')
const keyMapModel = require('../models/keyMap');
const database = require('../database.js')
const woocommerce = require('../woocommerce');

class ProductsMigrate {

  async execute() {
    const list = new database();
    await list.connect();

    const post = async (item) => {
      return await woocommerce.postAsync('products/batch', item).then(result => {
        return JSON.parse(result.toJSON().body)
      }).error(error => {
        console.error(error)
      }).then(json => {
        return json
      })
    }

    return await async.waterfall([
      async function findProducts(callback) {
        const attributes = await ProductsModel.find({}, null, {lean: true}).select('-terms')
        callback(null, attributes)
      },
      async (items, callback) => {
        const formatted = items.map(item => {
          return {
            products_id: item.products_id,
            products_price: item.products_price,
            products_quantity: item.products_quantity,
            products_image: item.products_image,
            description: {
              products_id: item.products_id,
              language_id: item.language_id,
              products_name: item.products_name,
              products_description: item.products_description,
              products_url: item.products_url,
              products_viewed: item.products_viewed
            }
          }
        });
        callback(null, items, formatted)
      },
      async (items, formatted, callback) => {
        const newItems = await post({'create': [...formatted]})

        const keys = newItems.create.map(item => {
          const old = items.filter(oldItem => {
            return oldItem.name === item.name
          });
          return {'old_id': old.length > 0 ? old[0].id : old.id, 'new_id': item.id}
        });

        callback(null, keys)
      },
      async (keys, callback) => {
        await keyMapModel.deleteMany({})
        await keyMapModel.create(...keys)
        callback(null)
      }
    ])
  }
}

module.exports = ProductsMigrate
