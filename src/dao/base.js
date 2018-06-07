const MongoDbObj = require('../mongo');

class BaseDao {

  constructor(collection) {
    this.collection = MongoDbObj.getCollection(collection);
  }

  insert(obj, callback) {
    this.collection.insertOne(obj, callback);
  }

  find(query) {
    return this.collection.find(query);
  }
}

module.exports = BaseDao;