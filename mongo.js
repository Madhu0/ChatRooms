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
  }
  
  handleConnection(error, db){
    if (error) {
      console.log(error);
      throw error;
    }
    console.log('Connection Successful');
    this.db = db;
    this.connectionStatus = true;
  }
  
  getConnectionStatus(){
    return this.connectionStatus;
  }

  getDb(){
    return this.db;
  }

  getCollection(collectionName){
    return db.collection(collectionName);
  }
}

module.exports = { MongoDb };