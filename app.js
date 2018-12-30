let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const cors = require('cors');

const MENU = {
  pizza: [
    { name: 'Pizza #1', price: 19.50, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-9b87b962-284e-9e19-f2cd-9cf9173e2826/thumbnail/it-9b87b962-284e-9e19-f2cd-9cf9173e2826_item.png', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    { name: 'Pizza #2', price: 20.30, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-623f3dd3-f92e-ad4c-cc3b-8a5bb9715021/thumbnail/it-623f3dd3-f92e-ad4c-cc3b-8a5bb9715021_item.png', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    { name: 'Pizza #3', price: 18.75, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-89924286-b978-14f0-7d6f-48c84e4d89f1/thumbnail/it-89924286-b978-14f0-7d6f-48c84e4d89f1_item.png', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    { name: 'Pizza #4', price: 21.30, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-068c6f7e-c08f-ba3c-633e-256b93e50b68/thumbnail/it-068c6f7e-c08f-ba3c-633e-256b93e50b68_item.png', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  ],
  drinks: [
    { name: 'Coca Cola', price: 5.00, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-2c78b769-a8ba-65bd-80dc-725083aefed0/thumbnail/it-2c78b769-a8ba-65bd-80dc-725083aefed0_item.png', description: 'tasty' },
    { name: 'Cappy', price: 4.75, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-b1bc7529-dda6-693d-c820-1096400c7949/thumbnail/it-b1bc7529-dda6-693d-c820-1096400c7949_item.png', description: 'tasty' },
    { name: 'Fanta', price: 5.00, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-3431a41d-5349-5be1-7d56-7cbf17139146/thumbnail/it-3431a41d-5349-5be1-7d56-7cbf17139146_item.png', description: 'tasty' },
    { name: 'Water', price: 3.50, imageUrl: 'https://static.vialacdn.com/master-menu/item/mt_30e90828-2e41-11e2-9d48-7a92eabdcf20/it-208fc4a3-63da-496f-03d9-91643985e909/thumbnail/it-208fc4a3-63da-496f-03d9-91643985e909_item.png', description: 'tasty' },
  ]
};

function logAllClient(io) {
  io.clients((error, clients) => {
      if (error) throw error;
      console.log('--> all clients: ', clients);
  });
};

function onClientConnected(io, socket) {
  console.log('--> Client connected: ', socket.id);

  sendAppMessageToClient(io, socket.id);
};

function sendAppMessageToClient(io, socketId) {
  console.log('...Sending app to:', socketId);
  io.to(socketId).emit('APP', {
    message: 'Type of app [MOBILE/DASHBOARD]',
    id: socketId
  });
}

function onAppTypeReceived(io, socket) {
  socket.on('APP', (message) => {
    console.log('--> APP: ', message.id, ' joined: ', message.type);
    socket.join(message.type)

    io.to('MOBILE').emit('INIT', MENU);
  });

function onNewOrderReceived(io, socket) {
  socket.on('NEW_ORDER', (message) => {
    const orderId = new Date()-0;
    console.log('--> NEW_ORDER: ', orderId, ' ordered: ', message.cart);

    const order = {
      id: orderId,
      order: message.cart
    };
    io.to('DASHBOARD').emit('NEW_ORDER', order);
  });
}

function onFinishOrderReceived(io, socket) {
  socket.on('FINISH_ORDER', (message) => {
    console.log('--> FINISH_ORDER: ', message.id);

    io.to('MOBILE').emit('FINISH_ORDER', message.id);
  });
}

io.on('connection', (socket) => {

    onClientConnected(io, socket);
    onAppTypeReceived(io, socket);
    onNewOrderReceived(io, socket);
    onFinishOrderReceived(io, socket);

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

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
