'use strict';

module.exports = class Sockets {
    constructor() {
        this.sockets = [];
    }

    addConnection(socket) {
        if(!socket) return; // valida conexão

        this.sockets.push(socket);

        // msg de boas vindas do servidor
        this.sendMsg(socket, 'Seja bem vindo!');

        if(this.sockets.length > 1)
            this.sendMsgForAll(socket, 'Novo usuário conectado.');
    }    
    
    closeConnection(socket, msg = 'Volte Sempre!') {
        if(!socket) return; // valida conexão
        
        // close socket
        this.sendMsg(socket, msg);
        socket.end();
        
        // remove socket on array
        let index = this.getIndex(socket);
        if (index > -1)
            this.sockets.splice(index, 1);
    }
    
    // enviando msg para o cliente
    sendMsg(socket, msg) {
        socket.write(msg);
    }
    
    // enviando a mensagem para todos os demais clientes conectados
    sendMsgForAll(socket, msg, remetente) {
        if(!msg) return;

        if(this.sockets.length < 2) {
            this.sendMsg(socket, 'Nenhum outro usuário para conversar');
        }

        this.sockets.forEach(connection => {
            if (connection !== socket)
                this.sendMsg(connection, msg);
        });
    }

    getQtdConnections() {
        return this.sockets.length;
    }

    getIndex(socket) {
        return this.sockets.indexOf(socket);
    }
}