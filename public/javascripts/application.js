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

function initialize() {
    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 19,
        center: new google.maps.LatLng(48.858565, 2.347198),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

if (navigator.geolocation)
    var watchId = navigator.geolocation.watchPosition(successCallback,
        null,
        {enableHighAccuracy:true});
else
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");

function successCallback(position){
    map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map
    });
}

function distance_with2point(position_a, position_b){
    var distance_m = distance(position_a.longitude,position_b.longitude,position_a.latitude,position_b.latitude);
    if (distance_m > 1000)
        distance_m /= roundDecimal(distance_m/10000);
    return distance_m;
}

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

function distance(longa,latb,longc,latd){
    return 6371000 * Math.acos(Math.cos(longa)*Math.cos(latb)*Math.cos(longc-latd)+Math.sin(longa)*Math.sin(latb));
}

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}