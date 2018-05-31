
const onMessage = (message) => { console.log('Incoming message', message); }

const ws1 = new WebSocket("ws://localhost:9000/connect?id=1234");
ws1.onopen = () => {
}
ws1.onmessage = (evet) => {
  onMessage('For WS1 ' + event.data);
}

const ws2 = new WebSocket("ws://localhost:9000/connect?id=1234");
ws2.onopen = () => {
}
ws2.onmessage = (evet) => {
  onMessage('For WS2 ' + event.data);
}

const ws3 = new WebSocket("ws://localhost:9000/connect?id=1234");
ws3.onopen = () => {
}
ws3.onmessage = (evet) => {
  onMessage('For WS3 ' + event.data);
}

const ws4 = new WebSocket("ws://localhost:9000/connect?id=1234");
ws4.onopen = () => {
  ws1.send('Sending from WS1');
  setTimeout(() => {
    ws2.send('Sending from WS2');
  }, 5000);
  setTimeout(() => {
    ws3.send('Sending from WS3');
  }, 10000);
  setTimeout(() => {
    ws4.send('Sending from WS4');
  }, 15000);
}
ws4.onmessage = (evet) => {
  onMessage('For WS4 ' + event.data);
}
