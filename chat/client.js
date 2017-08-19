var net = require('net');
var configServer = require('./server.config');

var client = net.connect(configServer);

// recebendo mensagens do servidor
client.on('data', message => {
    console.log(message.toString());
});

// client.on('connect', () => {
//     client.write('Hello, I am the client!');
// });

// escrevendo mensagens para o servidor
process.stdin.on('readable', () => {
    var message = process.stdin.read();

    if(!message) return;
    client.write(message.toString().replace(/\n/, ''));

    if(message.toString().indexOf('#q') > -1)
        client.end();
});