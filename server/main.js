import { createServer } from 'http';
import { Server } from 'socket.io';

// Create an HTTP server
const httpServer = createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Socket.IO server is running');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Create a Socket.IO server and attach it to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: '*', // Allow all origins (use specific origins in production)
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('msg', (data) => {
        // Broadcast to all except sender
        socket.broadcast.emit('rsv-msg', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server on port 8443
httpServer.listen(8443, () => {
    console.log('Server is running on http://localhost:8443');
});