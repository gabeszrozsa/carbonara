let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const cors = require('cors');

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected', socket);
    console.log('id: ', socket.id);

    io.clients((error, clients) => {
        if (error) throw error;
        console.log('log clients: ', clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    });

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
