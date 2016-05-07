$('#envoi_message').click(function(){
    var message = $('#message').val();
    socket.emit('message', message);
    insereMessage(pseudo, message);
    $('#message').val('').focus();
    return false;
});

socket.on('message', function(data) {
    insereMessage(data.pseudo, data.message)
});

socket.on('nouveau_client', function(pseudo) {
    $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
});

function insereMessage(pseudo, message) {
    $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
}
var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('petit_nouveau', pseudo);
document.title = pseudo + ' - ' + document.title;
