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

socket.on('inscription', function(data) {
    var html = "";
    html += "Inscription effectué";
    html += "";
    $("#inscription_ok").html(html);
    $("#inscription_ok").show( "slow" );
});

socket.on('log_in_ok', function(data){
    $('#sign_in').hide( "slow" );
    $('#sign_up').hide( "slow" );
    $('#connection').hide( "slow" );
    $('#connection_erreur').hide( "slow" );
    $('#login_value').html("Bonjour "+data);
});

socket.on('log_in_fail', function(data){
    $('#connection_erreur').html(data);
    $('#connection_erreur').show( "slow" );
});
