function CustomMarker(latlng, map, args) {
    this.latlng = latlng;
    this.args = args;
    this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

    var self = this;

    var div = this.div;

    if (!div) {

        div = this.div = document.createElement('div');
        infowindow = document.createElement('div');
        div.className = 'marker';

        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        div.style.width = '100px';
        div.style.height = '100px';
        div.style.padding = '10px';
        div.style.background = 'white';
        div.innerHTML = "<img src='' alt='photo de profil'>";

        if (typeof(self.args.marker_id) !== 'undefined') {
            div.dataset.marker_id = self.args.marker_id;
        }

        google.maps.event.addDomListener(div, "mouseover", function(event) {
            //console.log('mouseover');
            infowindow.style.display = '';
            infowindow.className = 'infowindow';
            infowindow.style.position = 'absolute';
            infowindow.style.width = 'auto';
            infowindow.style.height = 'auto';
            infowindow.style.padding = '10px';
            infowindow.style.background = 'white';
            // Ce texte change selon le profil recuperer l'id ou quelque chose pour savoir lequel.
            infowindow.innerHTML = 'Ceci est un test d\'infowindow';
        });

        google.maps.event.addDomListener(div, "mouseout", function(event) {
            //console.log('mouseout');
            infowindow.style.display = 'none';
        });

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        panes.overlayImage.appendChild(infowindow);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
        div.style.left = (point.x - 50) + 'px';
        div.style.top = (point.y - 100) + 'px';
        infowindow.style.left = (point.x - (-50)) + 'px';
        infowindow.style.top = (point.y - 100) + 'px';
    }
};

CustomMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

CustomMarker.prototype.getPosition = function() {
    return this.latlng;
};