$("#sign_in").click(function(){
    $('#container1').show( "slow" );
    $('#connection').hide( "slow" );
    $(this).fadeOut('slow');
    $('#sign_up').show( "slow" );
    $('#container2').hide( "slow" );
});

$("#sign_up").click(function(){
    $('#container1').hide( "slow" );
    $('#connection').show( "slow" );
    $(this).fadeOut( "slow" );
    $('#sign_in').show( "slow" );
    $('#container2').show( "slow" );
});

$("#submit_inscription").click(function(){
    var login = $("#login").val();
    var password = $("#password").val();
    var email = $("#email").val();
    var nom = $("#nom").val();
    var prenom = $("#prenom").val();
    socket.emit('inscription', {login: login, password: password, email:email, nom:nom, prenom:prenom});
});

$("#submit_connection").click(function(){
    var login = $("#login_in").val();
    var password = $("#password_in").val();
    socket.emit('login', {login: login, password: password});
});

$('#whoam_i').click(function(){
    socket.emit('whoami', 'me');
});

socket.on('youare', function(data){
    alert(data);
    console.info(data);
});

socket.on('inscription', function(data) {
    var html = "";
    html += "Inscription effectué";
    html += "";
    $("#inscription_ok").html(html);
    $("#inscription_ok").show( "slow" ).delay(4000).hide('slow');
});

socket.on('log_in_ok', function(data){
    $('#sign_in').hide( "slow" );
    $('#sign_up').hide( "slow" );
    $('#connection').hide( "slow" );
    $('#login_value').html("Bonjour "+data);
});

socket.on('log_in_fail', function(data){
    $('#connection_erreur').html(data);
    $('#connection_erreur').show( "slow" ).delay(4000).hide('slow');
});



function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return decodeURIComponent(parts.pop().split(";").shift());
}
function fetch(url, data, callback) {
    try {
        var x = new XMLHttpRequest();
        x.open(data ? 'POST' : 'GET', url, 1);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.onreadystatechange = function () {
            x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.send(data || null);
    } catch (e) {
        window.console && console.log(e);
    }
};
function connectServer(cb) {
    var sessionId = getCookie('connect.sid');
    var data = { forceNew: true, query : {  } };
    if (sessionId) {
        data.query.sessionId = sessionId
    }

    console.log('Trying to connect to Socket.io server');
    var server = io('http://socket.dev:8000', data);
    server.on('error', function (err) {
        console.log('----- Connection error : [%s]', err);
        setTimeout(function () {
            cb();
        }, 200);
    });
    server.on('connect', function (data) {
        console.log('----- Connection successful with sessionId [%s]', sessionId);
        setTimeout(function () {
            cb();
        }, 200);
    });
}
if (getCookie('connect.sid')) {
    console.log('Session cookie Detected');
    connectServer(function () { });
} else {
    connectServer(function () {
        console.log('Call ./authenticate to create session server side');
        fetch('./authenticate', null, function () {
            console.log('Session created');
            connectServer(function () {});
        });
    });
}