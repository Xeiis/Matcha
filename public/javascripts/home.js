$("#sign_in").click(function(){
    $('#container1').show( "slow" );
    $('#connection').hide( "slow" );
    $(this).fadeOut('slow');
    $('#sign_up').show( "slow" );
    $('#container2').hide( "slow" );
});

$("#sign_up").click(function(){
    $('#container1').hide( "slow" );
    $('#connection').show( "slow" );
    $(this).fadeOut( "slow" );
    $('#sign_in').show( "slow" );
    $('#container2').show( "slow" );
});

$("#submit_inscription").click(function(){
    var login = $("#login").val();
    var password = $("#password").val();
    var email = $("#email").val();
    var nom = $("#nom").val();
    var prenom = $("#prenom").val();
    socket.emit('inscription', {login: login, password: password, email:email, nom:nom, prenom:prenom});
});

function removeOverlay() {
    overlay.setMap(null);
}

$("#submit_connection").click(function(){
    var login = $("#login_in").val();
    var password = $("#password_in").val();
    $.ajax({
            method: "POST",
            url: "login",
            data: {login: login, password : password}
        })
        .done(function (msg) {
            if (msg == 'Mauvais login / Mot de passe')
            {
                $('#connection_erreur').html(msg);
                $('#connection_erreur').show("slow").delay(4000).hide('slow');
            }
            else {
                removeOverlay();
                if (navigator.geolocation)
                    var watchId = navigator.geolocation.watchPosition(save_position,
                        null,
                        {enableHighAccuracy:true});
                else
                    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
                $('#sign_in').hide( "slow" );
                $('#sign_up').hide( "slow" );
                $('#connection').hide( "slow" );
                $('#login_value').html("Bonjour "+msg);
                $('#submit_deconnection').fadeIn( "slow" );
                $('#profile').show('fast');
                socket.emit('login', msg);
            }
        });
});

function save_position(position){
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
                "<strong>"+msg[i].prenom+"</strong> - "+age+" ans</br>"+distance+"</br>"+msg[i].description // message dans l'infowindows
            );
            i++;
        }
    });
}

socket.on('inscription', function(data) {
    var html = "";
    html += "Inscription effectué";
    html += "";
    $("#inscription_ok").html(html);
    $("#inscription_ok").show( "slow" ).delay(4000).hide('slow');
});