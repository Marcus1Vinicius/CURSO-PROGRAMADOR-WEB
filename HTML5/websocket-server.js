const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
    console.log('Novo cliente conectado');

    socket.on('message', message => {
        console.log(`Mensagem recebida: ${message}`);
        
        // Envia a mensagem para todos os clientes conectados
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Servidor: ${message}`);
            }
        });
    });

    socket.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket rodando na porta 8080');
