let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const cors = require('cors');

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected', socket);
    console.log('nsp: ', socket.nsp);
    console.log('------');
    console.log('id: ', socket.id);
    console.log('------');
    console.log('client: ', socket.client);
    console.log('------');
    console.log('conn: ', socket.conn);
    console.log('------');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});
    });
});

app.use(cors());

// Initialize our websocket server on port 5000
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log('started on port', PORT);
});
