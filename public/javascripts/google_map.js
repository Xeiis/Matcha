function initialize() {
    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 15,
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
    // permet de se place là ou on se trouve
    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.panTo(myLatlng);
    // faire cela pour chaque personne, connecté en ce moment ? demander au serveur de retourner ces infos.
    $.ajax({
        method: "POST",
        url: "save_position",
        data : {latitude: position.coords.latitude, longitude: position.coords.longitude}
    });
    $.ajax({
        method: "POST",
        url: "get_profile_data"
    })
    .done(function (msg) {
        var i = 0;

        while(msg[i]) {
            age = dateDiff(msg[i].date, date_today());
            var distance = ConvertDistance(distance_with2point(msg[i].longitude, msg[i].latitude, position.coords.longitude, position.coords.latitude));
            var myLatlng = new google.maps.LatLng(msg[i].latitude, msg[i].longitude);
            overlay = new CustomMarker(
                myLatlng,
                map,
                {
                    marker_id: i
                },
                msg[i].profile,
                "<strong>"+msg[i].prenom+"</strong> - "+age+" ans</br>"+distance+"</br>"+msg[i].description, // message dans l'infowindows
                msg[i].login
            );
            i++;
        }
    });
}

function date_today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy+'/'+mm+'/'+dd;
    return today;
}
function dateDiff(date1, date2){
    var year = date2.substr(0,4) - date1.substr(0,4);
    var month = date2.substr(5,2) - date1.substr(5,2);
    if (month < 0)
        year--;
    else if (month == 0)
    {
        var day = date2.substr(8,2) - date1.substr(8,2);
        if (day < 0)
            year--;
        else if (day == 0)
            console.log("C'est votre anniversaire !"); // faire quelque chose de spéciale dans ce cas.
    }
    return year;
}

function ConvertDistance(d)
{
    var result;
    if( d < 1000 )
    {
        result = d + ' m';
    }
    else
    {
        d = d / 1000;
        d = roundDecimal(d,2);
        result = d + ' Km'
    }
    return result;
}

function distance_with2point(position_a_longitude, position_a_latitude, position_b_longitude, position_b_latitude){
    var distance_m = roundDecimal(distance(degree_to_radians(position_a_longitude),degree_to_radians(position_b_longitude),degree_to_radians(position_a_latitude),degree_to_radians(position_b_latitude)));
    return distance_m;
}

function degree_to_radians(degrees) {
    return degrees * Math.PI / 180;
}

function distance(longa,longb,lata,latb){
    return 6371000 * Math.acos(Math.cos(lata)*Math.cos(latb)*Math.cos(longa-longb)+Math.sin(lata)*Math.sin(latb));
}

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

initialize();