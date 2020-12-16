var async = require("async");
const CategoriesModel = require('../models/categories')
const keyMapModel = require('../models/keyMap');
const database = require('../database.js')
const woocommerce = require('../woocommerce');

class CategoriesMigrate {

  async execute() {
    const list = new database();
    await list.connect();

    const slugify = function (str)
    {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      let from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      let to   = "aaaaeeeeiiiioooouuuunc------";

      for (let i=0, l=from.length ; i<l ; i++)
      {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      str = str.replace('.', '-') // replace a dot by a dash
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by a dash
        .replace(/-+/g, '-'); // collapse dashes

      return str;
    }

    const categoriesReformat = (item) => {
      return {
        'parent': item['parent'],
        'menu_order': item['menu_order'],
        'name': item['name'],
        'description': item['description'],
        'display': item['display'],
      }
    }

    const post = async (item) => {
      return await woocommerce.postAsync('products/categories/batch', item).then(result => {
        return JSON.parse(result.toJSON().body)
      }).error(error => {
        console.error(error)
      }).then(json => {
        return json
      })
    }

    return await async.waterfall([
      async function findCategories(callback) {
        const categories = await CategoriesModel.find({'parent': 0}, null, {lean: true})
        callback(null, categories)
      },
      async (categories, callback) => {
        const formatted = await categories.map(item => {
          return categoriesReformat(item)
        })
        callback(null, formatted, categories)
      },
      async (items, oldCategories, callback) => {
        const newItems = await post({'create': [...items]})

        const keys = newItems.create.map(item => {
          const old = oldCategories.filter(oldItem => {
              return slugify(oldItem.name.replace(/\&/g, '&amp;')) === slugify(item.name)
          });
          return {'old_id': old.length > 0 ? old[0].id : old.id, 'new_id': item.id}
        });

        callback(null, keys)
      },
      async (keys, callback) => {
        await keyMapModel.deleteMany({})
        await keyMapModel.create(...keys)
        callback(null, keys)
      },
      async (keys, callback) => {
        const subCategories = await CategoriesModel.find({'parent': { $gt: 0 }}, null, {lean: true})
        return callback(null,keys, subCategories)
      },
      async (keys, subCategories, callback) => {
        const newSubCategories = subCategories.map(category => {
          const match = keys.filter(key => {
            return key.old_id === category.parent
          }).pop()
          category.parent = match.new_id
          return categoriesReformat(category)
        });
        callback(null, newSubCategories)
      },
      async (newSubCategories, callback) => {
        await post({'create': [...newSubCategories]})
        return callback(null)
      }
    ])
  }
}

module.exports = CategoriesMigrate
