require('dotenv').config();

import express from 'express';
import path from 'path';

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket: any) => {
    console.log("CONNECT");
    socket.on('request_open', (data: any) => {
        console.log("SENDING OPEN SIGNAL");
        io.sockets.emit('open');
    });
});

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + "/index.html"))
});

app.get('/killswitch', (request, response) => {
    io.sockets.emit('shutdown');
    response.status(200).end();
})

http.listen(process.env.PORT || 3001, ()  => {
    console.log(`Listening on port: ${process.env.PORT || 3001}`)
});
