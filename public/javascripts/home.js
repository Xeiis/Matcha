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
    $.ajax({
            method: "POST",
            url: "login",
            data: {login: login, password : password}
        })
        .done(function (msg) {
            if (msg == 'Mauvais login / Mot de passe')
            {
                $('#connection_erreur').html(msg);
                $('#connection_erreur').show("slow").delay(4000).hide('slow');
            }
            else {
                $('#sign_in').hide( "slow" );
                $('#sign_up').hide( "slow" );
                $('#connection').hide( "slow" );
                $('#login_value').html("Bonjour "+msg);
                $('#submit_deconnection').fadeIn( "slow" );
                $('#profile').show('fast');
                socket.emit('login', msg);
            }
        });
    //socket.emit('login', {login: login, password: password});
});

$('#whoam_i').click(function(){
    socket.emit('whoami');
});

socket.on('youare', function(data){
    alert(data);
    console.log(data);
});

socket.on('inscription', function(data) {
    var html = "";
    html += "Inscription effectué";
    html += "";
    $("#inscription_ok").html(html);
    $("#inscription_ok").show( "slow" ).delay(4000).hide('slow');
});