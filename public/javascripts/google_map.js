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
            url: "get_profile_data"
        })
        .done(function (msg) {
            //alert(msg);
            //if (msg == '')
            //{
                // while msg ( en json )
                /*overlay = new CustomMarker(
                    myLatlng,
                    map,
                    {
                        marker_id: '123'
                    },
                    '../images/tmp1.png', // a remplacer par les images de chaqu'un biensur ;)
                    'Ceci est un test d\'infowindow tralalalalalal lolo c\'est trop bien cette merde' // message dans l'infowindows
                );*/
                
                /*$('#connection_erreur').html(msg);
                $('#connection_erreur').show("slow").delay(4000).hide('slow');*/
        });
    overlay = new CustomMarker(
        myLatlng,
        map,
        {
            marker_id: '123'
        },
        '../images/8a70d9c62e591b1ba1be4e436f7607ee', // a remplacer par les images de chaqu'un biensur ;)
        'Ceci est un test d\'infowindow tralalalalalal lolo c\'est trop bien cette merde' // message dans l'infowindows
    );
    // enregistrer ce point en bdd et l'envoyez a tous les utilisateurs.

    /*alert(distance_with2point(position.coords.longitude, position.coords.latitude, 2.347198, 48.858565));
    on recuperer la bonne distance tout est ok.
    */
    //alert(ConvertDistance(distance_with2point(position.coords.longitude, position.coords.latitude, 2.347198, 48.858565)));
}

function ConvertDistance(d)
{
    var result;
    if( d < 1000 )
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