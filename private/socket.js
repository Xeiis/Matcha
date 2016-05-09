var index = require('../private/socket_index.js');
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");

module.exports = function(io) {
    io.use(sharedsession(session));
    io.sockets.on('connection', function (socket) {
        console.log('new user connected');
        socket.on('inscription', function (data) {
            index.inscription(data, inscription_ok);
        });
        socket.on('login', function (data){
            index.login(data, log_in);
        });
        socket.on('logout', function(userdata) {
            if (socket.handshake.session.userdata == userdata) {
                delete socket.handshake.session.userdata;
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
                socket.handshake.session.userdata = data.login;
                console.log(socket.handshake.session.userdata);
                socket.emit('log_in_ok', socket.handshake.session.userdata);
            }
            else
                socket.emit('log_in_fail', 'Mauvais login / Mot de passe');

        }
    });
};