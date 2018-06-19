const MongoClient = require('mongodb').MongoClient;


class MongoDb {

  constructor(url = 'mongodb://localhost:27017/ChatRooms', config, onConnection = () => {}) {
    this.handleConnection = this.handleConnection.bind(this);
    this.getConnectionStatus = this.getConnectionStatus.bind(this);
    this.getDb = this.getDb.bind(this);
    this.getCollection = this.getCollection.bind(this);

    this.db = null;
    this.connectionStatus = false;
    MongoClient.connect(url, (error, db) => {
      this.handleConnection(error, db);
      onConnection(error, db);
    });
    this.subscribers = {};
  }

  subscribeToConnectionStatusChange(callback) {
    const id = (new Date()).getTime() + '';
    this.subscribers[id] = callback;
    if (this.connectionStatus) {
      callback('connected');
    }
    return id;
  }

  unSubscribe(id) {
    delete this.subscribers[id];
    return true;
  }

  callSubscribers(status) {
    Object.keys(this.subscribers).forEach((key, index) => {
      this.subscribers[key](status);
    })
  }
  
  handleConnection(error, db){
    if (error) {
      // console.log(error);
      throw error;
    }
    // console.log('Connection to DB Successful');
    this.db = db.db('test');
    this.connectionStatus = true;
    this.callSubscribers('connected');
  }
  
  getConnectionStatus(){
    return this.connectionStatus;
  }

  getDb(){
    return this.db;
  }

  getCollection(collectionName){
    return this.db.collection(collectionName);
  }
}

const mongoDbObj = new MongoDb();

module.exports = mongoDbObj;