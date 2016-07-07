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
    // creer un point sur la map
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
        content: "Hello World !",
        size: new google.maps.Size(100, 100)
    });

    google.maps.event.addListener(marker, 'click', function(){
        infowindow.open(map,marker);
    });

    // faire cela pour chaque personne, connecté en ce moment ?
    overlay = new CustomMarker(
        myLatlng,
        map,
        {
            marker_id: '123'
        }
    );
    // enregistrer ce point en bdd et l'envoyez a tous les utilisateurs.

    /*var new_marker = new google.maps.Marker({
        position: new google.maps.LatLng(48.858565, 2.347198),
        map: map
    });
    alert(distance_with2point(position.coords.longitude, position.coords.latitude, 2.347198, 48.858565));
    on recuperer la bonne distance tout est ok.
    */
    //alert(ConvertDistance(distance_with2point(position.coords.longitude, position.coords.latitude, 2.347198, 48.858565)));
}

function ConvertDistance(d)
{
    var result;
    if(d<1000 )
    {
        result = d + ' M';
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