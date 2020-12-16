const mongoose = require('mongoose');

require('mongodb');
/**
 * Manages crud for oob mongo db documents
 */
class Database {
    /**
     * Sets up connection for mongo db to be used through composition.
     * @returns {Promise<void>}
     */
    constructor() {
      this.connect();
    }

    connect () {
      const mongoDB = 'mongodb://outofbody.com.au:27017/oob_migrate';
      if (mongoose.connection.readyState == 0) {
        mongoose.connect(mongoDB, {useNewUrlParser: true});
      }
      return mongoose;
    }
}

module.exports = Database;
