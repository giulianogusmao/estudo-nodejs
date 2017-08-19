'use strict';

var net = require('net');
var configServer = require('./server.config');

var Sockets = require('./sockets');
var sockets = new Sockets();


var server = net.createServer((socket) => {
    sockets.addConnection(socket);

    // set nickname default
    if (!socket.nickname)
        socket.nickname = `Usuário ${sockets.getIndex(socket) + 1}`;

    // lendo mensagens do cliente
    socket.on('data', (message) => {
        if(!message) return;

        // converte msg
        let msg = message.toString();

        // alterando nome do usuario
        if (msg.indexOf('/nome ') == 0) {
            var nome = msg.replace('/nome ', '');
            socket.nickname = msg.replace('/nome ', '');
            sockets.sendMsg(socket, `Nickname alterado para ${nome}`);
            // if(sockets.getQtdConnections() > 1)
            //     sockets.sendMsgForAll(socket, `Nickname alterado para ${socket.nickname}`);
            return false;
        }

        // verifica se é para encerrar a conexão
        if (msg.indexOf('#q') == 0) {
            if(sockets.getQtdConnections() > 1)
                sockets.sendMsgForAll(socket, `${socket.nickname} saiu da conversa.`);

            sockets.closeConnection(socket);
            return;
        }

        // distribuindo a mensagem para os demais clientes
        sockets.sendMsgForAll(socket, (socket.nickname + ' > ' + msg));
    });
});
// .on('error', (err) => {
//     throw err;
// })



// var net = require('net');
// var connections = [];
// var broadcast = function (message, origin) {
//     connections.forEach(function(connection) {
//         if(connection === origin) return;
//         connection.write(message);
//     })
// };

// var server = net.createServer(function(connection){
//     connections.push(connection);

//     connection.on('data', function(message){
//         var command = message.toString();

//         if(command.indexOf('/nickname') === 0) {
//             var nickname = command.replace(/\/nickname /,'');
//             connection.nickname = nickname;
//             return;
//         }
        
//         broadcast(connection.nickname + ' > ' + message, connection);
//     });
// })

server.listen(configServer);