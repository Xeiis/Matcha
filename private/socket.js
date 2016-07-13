var index = require('../private/socket_index.js');

module.exports = function(io) {
    io.on('connection', function (socket) {
        if(socket.handshake.session.login) {
            socket.emit('youare_logged', socket.handshake.session.login);
        }
        else
            socket.emit('youare_not_logged');
        socket.on('inscription', function (data) {
            index.inscription(data, inscription_ok);
        });
        socket.on('whoami', function () {
            socket.emit('youare', "Session id: " + socket.handshake.session.uid + " login : " + socket.handshake.session.login);
        });
        socket.on('logout', function() {
            socket.handshake.session.login = '';
        });
        socket.on('login', function(data) {
            socket.handshake.session.login = data;
        });
        socket.on('message', function (message) {
            message = ent.encode(message);
            socket.broadcast.emit('message', {message: message, pseudo: socket.pseudo});
        });
        socket.on('petit_nouveau', function (pseudo) {
            pseudo = ent.encode(pseudo);
            socket.pseudo = pseudo;
            socket.broadcast.emit('nouveau_client', pseudo);
        });
        function inscription_ok(data){
            socket.emit('inscription', 'Inscription réussi.');
        }
    });
};