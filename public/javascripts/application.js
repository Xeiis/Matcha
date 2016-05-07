var socket = io.connect('http://localhost:3000', {reconnect: true});

socket.on('connect', function() {
    console.log('Connected!');
});
socket.on('event', function(data){
    console.log('Event');
});
socket.on('disconnect', function(){
   console.log('Disconnect');
});