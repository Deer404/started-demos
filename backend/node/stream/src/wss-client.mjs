import WebSocket from 'ws';

const url = 'ws://localhost:8080/socket';
const ws = new WebSocket(url);

ws.on('open', function open() {
    console.log('Connected to the WebSocket server');
    ws.send('Hello Server!');
});

ws.on('message', function incoming(data) {
    const message = data.toString('utf-8');
    console.log('Received message from server:', message);
});

ws.on('close', function close() {
    console.log('Disconnected from the WebSocket server');
});



ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});