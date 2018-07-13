var clients = {};

function handleIo(socket) {
    console.log('New client connected: ' + socket.id);

    if (clients[socket.id] === undefined) {
        clients[socket.id] = {};
    }

    socket.on('disconnect', function () {
        console.log(clients[socket.id].name + ' - client disconnected');
        socket.broadcast.emit('user_disconnected', clients[socket.id].name);
        delete clients[socket.id];
        console.log(clients);
    });

    socket.on('chat_message', function (info) {
        console.log('incoming message from: ' + info.userName);
        socket.broadcast.emit('chat_message', info);
        console.log(clients);
    });

    socket.on('new_user', function(name) {
        console.log('new User: '+ name);
        if (clients[socket.id]) {
            clients[socket.id].name = name;
        }
        console.log(clients);
        socket.broadcast.emit('new_user', name);
    });
};

module.exports = handleIo;