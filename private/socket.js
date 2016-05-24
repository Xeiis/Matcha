var index = require('../private/socket_index.js');

module.exports = function(io) {
    io.on('connection', function (socket) {
        console.log(socket.handshake.session);
        console.log('new user connected');
        socket.on('inscription', function (data) {
            index.inscription(data, inscription_ok);
        });
        socket.on('whoami', function (data) {
            socket.emit('youare', "Session id: " + socket.handshake.session.uid + " login : " + socket.handshake.session.login);
        });
        socket.on('login', function (data){
            index.login(data, log_in);
        });
        socket.on('logout', function(userdata) {
            console.log("logout : "+socket.handshake.session.login);
            if (socket.handshake.session.login == userdata) {
                delete socket.handshake.session.login;
            }
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
        function log_in(data){
            if (data) {
                socket.handshake.session.login = data.login;
                socket.emit('log_in_ok', socket.handshake.session.login);
            }
            else
                socket.emit('log_in_fail', 'Mauvais login / Mot de passe');

        }
    });
};