var img_mod = '../images/suppression.png';
var action = 'suppr_images';
var name = 'url';
var img;

$("#update_profile").click(function() {
    var nom = $("#nom").val();
    var prenom = $("#prenom").val();
    var login = $("#login").val();
    var email = $("#email").val();
    var ville = $("#ville").val();
    var cp = $("#cp").val();
    var date = $("#date").val();
    var sexe = $("#sexe").val();
    var attirance = $("#attirance").val();
    var description = $("#description").val();
    $.ajax({
            method: "POST",
            url: "update_profile",
            data: {nom: nom, prenom: prenom, email: email, ville: ville, cp: cp, date: date, attirance: attirance, sexe: sexe, description: description, login: login}
        })
        .done(function (msg) {
            if (msg == 'done') {
                // modification effectué
                $('#profile_modif_ok').show("slow").delay(4000).hide('slow');
            }
            else {
                // modification erreur
                $('#profile_modif_erreur').show("slow").delay(4000).hide('slow');
            }
        });
});

$("#profile_img").on('click', function() {
    img_mod = '../images/profile.jpg';
    action = 'profile_picture';
    name = 'profile';
});

$("#supprimer").on('click', function() {
    img_mod = '../images/suppression.png';
    action = 'suppr_images';
    name = 'url';
});

$(".images").mouseover(function(){
    img = this.src;
    this.setAttribute('src', img_mod);
    this.setAttribute('width', '200');
    this.setAttribute('height', '200');
});

$(".images").mouseout(function() {
    this.setAttribute('src', img);
});

$(".images").on('click', function(){
    div = img.substr(29);
    img = img.substr(22);
    var data;

    if (name == 'url')
        data = {url : img};
    else
        data = {profile : img};
    $.ajax({
            method: "POST",
            url: action,
            data: data
        })
        .done(function (msg) {
            if (msg == 'done') {
                // modification effectué
                if (name == 'url')
                    $("#"+div+"").hide();
                $("#profile_modif_ok").show("slow").delay(4000).hide('slow');
            }
            else {
                // modification erreur
                $("#profile_modif_erreur").show("slow").delay(4000).hide('slow');
            }
        });
});