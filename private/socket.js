var index = require('../private/socket_index.js');
var sessionExpress = require('express-session');
var FileStore = require('session-file-store')(sessionExpress);

var session = require('../session-share'),
    sessionIdKey = session.sessionKey;

module.exports = function(io) {
    io.use(function(socket, accept) {
        // writing sessionId, sent as parameter, on the socket.handshake cookies
        if (socket.handshake.query.sessionId) {
            var cookies = (socket.handshake.headers.cookie || '').split(';');
            cookies.push(sessionIdKey + '=' + socket.handshake.query.sessionId);
            socket.handshake.headers.cookie = cookies.join(';');
        }
        // tells the system to load the session from socket.handshake
        // usually the session is loaded from req.headers.cookie, but socket req is the handshake
        // and the cookies are situated in socket.handshake.headers.cookie
        session(socket.handshake, {}, function(err) {
            if (err) return accept(err);
            console.log('User trying to connect to Socket.io');
            var session = socket.handshake.session,
                userData = session.userdata || {};

            // is connected and good
            if (!userData || !userData.connected) {
                console.log('----- User has no active session, error');
                accept(new Error('Not authenticated'));
            } else {
                console.log('----- Socket.io connection attempt successful');
                accept(null, session.userid !== null);
            }
        });
    });
    io.sockets.on('connection', function (socket) {
        console.log('new user connected');
        socket.on('inscription', function (data) {
            index.inscription(data, inscription_ok);
        });
        socket.on('whoami', function (data) {
            socket.emit('youare', socket.handshake.session.userdata);
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