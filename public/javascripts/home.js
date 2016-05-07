$("#sign_in").click(function(){
    $('#inscription').css('display','block');
    $('#connection').css('display','none');
    $(this).css('display','none');
    $('#sign_up').css('display',"");
});

$("#sign_up").click(function(){
    $('#inscription').css('display','none');
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

$("#submit_connexion").click(function(){

});

