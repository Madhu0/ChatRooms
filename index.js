const MongoDbObj = require('./src/mongo');

const initialize = () => {

  var express = require('express');
  var bodyParser = require('body-parser');

  var WebSocketServer = require('websocket').server;
  var WebSocketRouter = require('websocket').router;

  const UserController = require('./src/controllers/user');
  
  const groups = {
    1234: [],
    3456: [],
  }

  const app = express();

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test/index.html');
  })

  app.get('/static/:fileName', (req, res) => {
    const fileName = req.params.fileName;

    res.sendFile(__dirname + '/test/' + fileName);
  })

  app.post('/signup', (req, res) => {
    //TODO: Sign up
    (new UserController(req, res)).createUser();
    // res.send('Lol')
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

  const server = app.listen(9000);
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

  MongoDbObj.unSubscribe(unSubId);
}

const unSubId = MongoDbObj.subscribeToConnectionStatusChange(initialize);
