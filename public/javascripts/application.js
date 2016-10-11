var socket = io.connect('http://localhost:3000');

var data_visite = {};
var data_like = {};
var data_match = {};
var data_message = {};
var data_unlike = {};
var visite = 0;
var like = 0;
var unlike = 0;
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

socket.on('new_like', function(data){
    data_like = data;
    like = 1;
    socket.emit('whoami');
});

socket.on('new_unlike', function(data){
    data_unlike = data;
    unlike = 1;
    socket.emit('whoami');
});

socket.on('youare', function(login)
{
    var html;
    if (visite == 1)
    {
        if (data_visite.visited == login)
        {
            var notif_visite = $("#visite_notif");
            notif_visite.css('display', '');
            html = notif_visite.html();
            html = parseInt(html) + 1;
            if (!html)
                html = 1;
            notif_visite.html(html);
            visite = 0;
        }
    }
    if (match == 1)
    {
        if (data_match.matched == login)
        {
            var notif_match = $("#match_notif");
            notif_match.css('display', '');
            html = notif_match.html();
            html = parseInt(html) + 1;
            if (!html)
                html = 1;
            notif_match.html(html);
            match = 0;
        }
    }
    if (like == 1)
    {
        if (data_like.liked == login)
        {
            var notif_like = $("#like_notif");
            notif_like.css('display', '');
            html = notif_like.html();
            html = parseInt(html) + 1;
            if (!html)
                html = 1;
            notif_like.html(html);
            like = 0;
        }
    }
    if (unlike == 1)
    {
        if (data_unlike.unliked == login)
        {
            var notif_unlike = $("#unlike_notif");
            notif_unlike.html("L'utilisateur "+ data_unlike.unlikeur + " ne vous like plus.");
            $("#unlike_notif").show( "slow" ).delay(10000).hide('slow');
            unlike = 0;
        }
    }
    if (message == 1)
    {
        if (data_message.message_to == login)
        {
            var notif_chat = $("#chat_notif");
            var CheminComplet = document.location.href;
            var Login = CheminComplet.substring(CheminComplet.lastIndexOf("/") + 1);
            if (data_message.message_from == Login)
            {
                notif_chat.css('display', 'none');
                notif_chat.html('');
                var conversation = $(".conversation").html();
                conversation += "<div class='bloc'><div class='text left' style='float:left'>" + data_message.message + "</div></div>";
                $(".conversation").html(conversation);
            }
            else
            {
                notif_chat.css('display', '');
                html = notif_chat.html();
                html = parseInt(html) + 1;
                if (!html)
                    html = 1;
                notif_chat.html(html);
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
    $('#like').show('fast');
});

socket.on('youare_not_logged', function(){
    $('#sign_in').fadeIn('fast');
    $('#sign_up').fadeIn('fast'); 
});

$("#submit_deconnection").click(function(){
    socket.emit('logout');
    //$('#recherche_block').css('display', 'none');
    $('#profile').hide('fast');
    $('#visites').hide('fast');
    $('#match').hide('fast');
    $('#chat').hide('fast');
    $('#like').hide('fast');
    $.ajax({
            method: "POST",
            url: "/logout"
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
            else
            {
                get_data(position_save);
            }
        });
});

var CheminComplet = document.location.href;
var page = CheminComplet.substring(CheminComplet.lastIndexOf("/") + 1);
if (page == 'visites')
{
    var notif_visite = $("#visite_notif");
    notif_visite.css('display', 'none');
    notif_visite.html('');
}
else if (page == 'match')
{
    var notif_match = $("#match_notif");
    notif_match.css('display', 'none');
    notif_match.html('');
}


