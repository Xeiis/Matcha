function CustomMarker(latlng, map, args, img, text) {
    this.latlng = latlng;
    this.args = args;
    this.img = img;
    this.text = text;
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
        div.style.background = 'white';
        div.style.border = '5px solid #aaaba8';
        div.innerHTML = "<img src='"+ this.img +"' width='90' height='90' alt='photo de profil'>";

        if (typeof(self.args.marker_id) !== 'undefined') {
            div.dataset.marker_id = self.args.marker_id;
        }

        google.maps.event.addDomListener(div, "mouseover", function(event) {
            infowindow.style.display = '';
            infowindow.className = 'infowindow';
            infowindow.style.position = 'absolute';
            infowindow.style.width = 'auto';
            infowindow.style.maxWidth = '300px';
            infowindow.style.height = 'auto';
            infowindow.style.padding = '10px';
            infowindow.style.background = 'white';
            infowindow.innerHTML = self.text;
        });

        google.maps.event.addDomListener(div, "mouseout", function(event) {
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