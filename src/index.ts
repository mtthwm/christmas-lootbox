import { Socket } from 'dgram';
import express from 'express';

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket: Socket) => {
    console.log("CONNECT");
    socket.emit('someone connected');
});

app.get('/', (request, response) => {
    // response.sendFile(__filename)
});

app.listen(3001, ()  => {
    console.log("listening on port 3001")
});
