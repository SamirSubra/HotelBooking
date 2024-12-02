import * as http from 'http';
import app from './app';

// Type definition for the normalizePort function
const normalizePort = (val : string): number | string | boolean => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Getting the port (either from environment variables or default to '3000')
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Type definition for error handling
const errorHandler = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Create the server
const server = http.createServer(app);

// Handle server events
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Start listening on the specified port
server.listen(port);
