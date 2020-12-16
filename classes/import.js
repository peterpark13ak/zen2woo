var axios = require('axios');

/**
 * Retrieves json data from oob api.
 */
class Importer {
    /**
     * Gets a list of products from api and returns result on promise satisfied.
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async getProducts() {
        function _requestProducts() {
            return axios.get('https://outofbodypiercings.com/wpoob/?products');
        }

        return await _requestProducts().then((data) => {
            return data.data;
        });
    }

    /**
     * Gets a list of products from api and returns result on promise satisfied.
     * @returns {Promise<AxiosResponse<any>>}
     */
    static async getCategories() {
        function _requestCategories() {
            return axios.get('https://outofbodypiercings.com/wpoob/?categories');
        }

        return await _requestCategories().then((data) => {
            return data.data;
        });
    }

  /**
   * Gets a list of products from api and returns result on promise satisfied.
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async getAttributes() {
    function _requestAttributes() {
      return axios.get('https://outofbodypiercings.com/wpoob/?attributes');
    }

    return await _requestAttributes().then((data) => {
      return data.data;
    });
  }
}

module.exports = Importer;
