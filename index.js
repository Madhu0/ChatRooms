var http = require('http');

var WebSocketServer = require('websocket').server;
var WebSocketRouter = require('websocket').router;

const groups = {
  1234: [],
  3456: [],
}

const server = http.createServer(() => {
  console.log(arguments);
});

const getQueryParamsFromUrl = (url) => {
  const queryObj = {};
  const urlParts = url.split('?');
  if (urlParts.length <= 1) {
    return queryObj;
  }
  
  const queryString =  decodeURIComponent(urlParts[1]);
  queryString.split('&').forEach((queryPart, index) => {
    const [key, value] = queryPart.split('=');
    if (key && value) {
      queryObj[key] = value;
    }
  });

  return queryObj;
}

server.listen(9000);
console.log('Listening on 9000');

wsServer = new WebSocketServer({
  httpServer: server
});

const wsRouter = new WebSocketRouter();
wsRouter.attachServer(wsServer);

wsRouter.mount('/connect', null, (request) => {
  // console.log('In mount', request.httpRequest.query, request.httpRequest.params);
  const queryObj = getQueryParamsFromUrl(request.httpRequest.url);
  
  var cookies = [];
  const connection = request.accept(request.origin, cookies);
  
  console.log('connection', connection);
  if (queryObj.id) {
    if (!groups[queryObj.id]) {
      groups[queryObj.id] = [];
    }
    groups[queryObj.id].push(connection);
  }

  connection.on('message', (message) => {
    groups[queryObj.id].forEach((con, i) => {
      if (con !== connection && con.connected) {
        con.send(message.utf8Data);
      } else if (!con.connected) {
        groups[queryObj.id].splice(i, 1);
      }
    })
    // console.log('in message', message, currentGroup);
  });

  connection.on('close', (connection) => {
    console.log('on close', connection);
  });
})

var MongoDb = require('./src/mongo').MongoDb;

console.log(MongoDb);

MongoDbObj = new MongoDb();
