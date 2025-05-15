const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Serve static files (if any)
app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  console.log(`Client connected: ${socket.id}`);

  // Echo any message back to all clients
  socket.on('chat message', msg => {
    console.log('msg:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); 