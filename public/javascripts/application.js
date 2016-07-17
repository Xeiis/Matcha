var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
    console.log('Connected!');
});
socket.on('event', function(data){
    console.log('Event');
});
socket.on('disconnect', function(){
   console.log('Disconnect');
});

socket.on('youare_logged', function(data){
    /*$('#sign_in').css('display', 'none');
    $('#sign_up').css('display', 'none');*/
    $('#connection').css('display', "none" );
    $('#submit_deconnection').css('display', "block" );
    $('#login_value').html("Bonjour "+data);
    $('#profile').show('fast');
});

socket.on('youare_not_logged', function(){
    $('#sign_in').fadeIn('fast');
    $('#sign_up').fadeIn('fast'); 
});

$("#submit_deconnection").click(function(){
    socket.emit('logout');
    $('#profile').hide('fast');
    $.ajax({
            method: "POST",
            url: "logout"
        })
        .done(function (msg) {
            $('#sign_in').show( "slow" );
            $('#sign_up').show( "slow" );
            $('#submit_deconnection').fadeOut( "slow" );
            $('#login_value').html('');
            document.location.href = 'http://localhost:3000/';
        });
}); 
