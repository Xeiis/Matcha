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
            console.log('you are : '+ socket.handshake.session.login);
            socket.emit('youare', socket.handshake.session.login);
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
        socket.on('visite', function (visited) {
            console.log(socket.handshake.session.login);
            console.log(visited);
           socket.broadcast.emit('new_visite', {visiteur : socket.handshake.session.login, visited: visited});
        });
        socket.on('like', function (liked) {
            console.log(socket.handshake.session.login);
            console.log(liked);
            socket.broadcast.emit('new_like', {likeur : socket.handshake.session.login, liked: liked});
        });
        socket.on('match', function (matched) {
            console.log(socket.handshake.session.login);
            console.log(matched);
            socket.broadcast.emit('new_match', {matcheur : socket.handshake.session.login, matched: matched});
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