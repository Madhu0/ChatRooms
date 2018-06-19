const MongoDbObj = require('../mongo');

class BaseDao {

  constructor(collection) {
    this.collection = MongoDbObj.getCollection(collection);
  }

  insert(obj, callback) {
    this.collection.insertOne(obj, callback);
  }

  find(query, callback) {
    const returnObj = this.collection.find(query);
    if (callback && returnObj) {
      returnObj.toArray((err, res) => {
        callback(res, err);
      })
    }
  }
}

module.exports = BaseDao;