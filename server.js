// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

const users = {};

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
        delete users[socket.id];
        // Emit the username of the user who disconnected
        io.emit('user disconnected', users[socket.id]);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', { message: msg, name: users[socket.id] });
    });

    socket.on('set name', (name) => {
        users[socket.id] = name;
        // Emit the username of the user who connected
        io.emit('user connected', name);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
