var socket = io.connect('http://localhost:3000');

var data_visite = {};
var data_like = {};
var data_match = {};
var data_message = {};
var visite = 0;
var like = 0;
var match = 0;
var message = 0;

socket.on('connect', function() {
    console.log('Connected!');
});
socket.on('event', function(data){
    console.log('Event');
});
socket.on('disconnect', function(){
   console.log('Disconnect');
});

socket.on('new_visite', function(data){
    data_visite = data;
    visite = 1;
    socket.emit('whoami');
});

socket.on('new_like', function(data){
    data_like = data;
    like = 1;
    socket.emit('whoami');
});

socket.on('new_match', function(data){
    data_match = data;
    match = 1;
    socket.emit('whoami');
});

socket.on('new_message', function(data){
    data_message = data;
    message = 1;
    socket.emit('whoami');
});

socket.on('youare', function(login)
{
    if (visite == 1)
    {
        if (data_visite.visited == login)
        {
            alert('Vous avez une nouvelle visite de ' + data_visite.visiteur);
            // afficher la notif pas d'alert merci.
            visite = 0;
        }
    }
    if (like == 1)
    {
        if (data_like.liked == login)
        {
            alert('Vous avez un nouveau like de ' + data_like.likeur);
            // afficher la notif pas d'alert merci.
            like = 0 ;
        }
    }
    if (match == 1)
    {
        if (data_match.matched == login)
        {
            alert('Vous avez un nouveau match avec ' + data_match.matcheur);
            // afficher la notif pas d'alert merci.
            match = 0;
        }
    }
    if (message == 1)
    {
        if (data_message.message_to == login)
        {
            var CheminComplet = document.location.href;
            var Login = CheminComplet.substring(CheminComplet.lastIndexOf("/") + 1);
            if (data_message.message_from == Login)
            {
                var conversation = $(".conversation").html();
                conversation += "<div class='bloc'><div class='text left' style='float:left'>" + data_message.message + "</div></div>";
                $(".conversation").html(conversation);
            }
            else
            {
                alert('Vous avez un nouveau message ' + data_message.message + ' de ' + data_message.message_from);
            }
            message = 0;
        }
    }
});

socket.on('youare_logged', function(data){
    $('#connection').css('display', "none" );
    $('#submit_deconnection').css('display', "block" );
    $('#recherche_block').css('display', 'block');
    $('#login_value').html("Bonjour "+data);
    $('#profile').show('fast');
    $('#visites').show('fast');
    $('#match').show('fast');
    $('#chat').show('fast');
});

socket.on('youare_not_logged', function(){
    $('#sign_in').fadeIn('fast');
    $('#sign_up').fadeIn('fast'); 
});

$("#submit_deconnection").click(function(){
    socket.emit('logout');
    $('#recherche_block').css('display', 'none');
    $('#profile').hide('fast');
    $('#visites').hide('fast');
    $('#match').hide('fast');
    $('#chat').hide('fast');
    $.ajax({
            method: "POST",
            url: "logout"
        })
        .done(function (msg) {
            $('#sign_in').show( "slow" );
            $('#sign_up').show( "slow" );
            $('#submit_deconnection').fadeOut( "slow" );
            $('#login_value').html('');
            var CheminComplet = document.location.href;
            var NomDuFichier = CheminComplet.substring(CheminComplet.lastIndexOf( "/" )+1 );
            if (NomDuFichier != '') {
                document.location.href = 'http://localhost:3000/';
            }
        });
});



