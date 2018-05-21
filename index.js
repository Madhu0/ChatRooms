var http = require('http');

var WebSocketServer = require('websocket').server;

const server = http.createServer(() => {
  console.log(arguments);
});

server.listen(9000);
console.log('Listening on 9000');

wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  
  connection.on('message', (message) => {
    console.log(message);
  });

  connection.on('close', (connection) => {
    console.log(connection);
  });
});

var MongoDb = require('./mongo').MongoDb;

console.log(MongoDb);

MongoDbObj = new MongoDb();
