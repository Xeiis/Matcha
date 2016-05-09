$("#sign_in").click(function(){
    $('#container1').css('display','block');
    $('#connection').css('display','none');
    $(this).css('display','none');
    $('#sign_up').css('display',"");
});

$("#sign_up").click(function(){
    $('#container1').css('display','none');
    $('#connection').css('display','block');
    $(this).css('display','none');
    $('#sign_in').css('display',"");
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
    $("#inscription_ok").css('display','block');
});

socket.on('log_in_ok', function(data){
    $('#sign_in').css('display','none');
    $('#sign_up').css('display','none');
    $('#connection').css('display','none');
    $('#connection_erreur').css('display','none');
    $('#login_value').html("Bonjour "+data);
});

socket.on('log_in_fail', function(data){
    $('#connection_erreur').html(data);
    $('#connection_erreur').css('display','block');
});
