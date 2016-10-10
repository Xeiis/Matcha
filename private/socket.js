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
            socket.emit('youare', socket.handshake.session.login);
        });
        socket.on('logout', function() {
            socket.handshake.session.login = '';
        });
        socket.on('login', function(data) {
            socket.handshake.session.login = data;
        });
        socket.on('visite', function (visited) {
           socket.broadcast.emit('new_visite', {visited: visited});
        });
        socket.on('match', function (matched) {
            socket.broadcast.emit('new_match', {matched: matched});
        });
        socket.on('like', function (liked) {
            socket.broadcast.emit('new_like', {liked: liked});
        });
        socket.on('unlike', function (unliked) {
            socket.broadcast.emit('new_unlike', {unlikeur : socket.handshake.session.login, unliked: unliked});
        });
        socket.on('message', function (message) {
            socket.broadcast.emit('new_message', {message_from : socket.handshake.session.login, message: message.message, message_to: message.login});
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