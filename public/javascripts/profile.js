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
                $('#profile_modif').show("slow").delay(4000).hide('slow');
            }
            else {
                // modification erreur
                $('#profile_modif_erreur').show("slow").delay(4000).hide('slow');
            }
        });
});

var img;

$(".images").mouseover(function(){
    console.log('mouseover : '+ this.src);
    img = this.src;
    this.setAttribute('src', '../images/suppression.png');
    this.setAttribute('width', '200');
    this.setAttribute('height', '200');
});

$(".images").mouseout(function() {
    console.log('mouseout');
    this.setAttribute('src', img);
});

$(".images").on('click', function(){
    div = img.substr(29);
    img = img.substr(22);
    $.ajax({
            method: "POST",
            url: "suppr_images",
            data: {url: img}
        })
        .done(function (msg) {
            if (msg == 'done') {
                // modification effectué
                $("#"+div+"").hide();
                console.log('done');
            }
            else {
                // modification erreur
                console.log('error');
            }
        });
});