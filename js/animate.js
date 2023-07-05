 // center on Bs/M
        //const map = L.map('map').setView([50.727, 1.577], 13);
                // DK
    const map = L.map('map').setView([51.070635, 2.362061], 13);

    var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
/*
    //    const tiles = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    // base layer : OSM
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {            
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
*/
    //link to tiles
    var osmsea=new L.TileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',{
        minZoom:1,
        maxZoom:20
    }).addTo(map);

    // use groups ? 
    var seamap = L.layerGroup([OpenStreetMap_France, osmsea]);


// animation part
var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);
/*
var map = L.map('map', {
    zoom: 12,
    fullscreenControl: true,
    center: [39.3, 4]
});
*/
// start of TimeDimension manual instantiation
var timeDimension = new L.TimeDimension({
        period: "PT5M",
    });
// helper to share the timeDimension object between all layers
map.timeDimension = timeDimension; 
// otherwise you have to set the 'timeDimension' option on all layers.

var player        = new L.TimeDimension.Player({
    transitionTime: 100, 
    loop: false,
    startOver:true
}, timeDimension);

var timeDimensionControlOptions = {
    player:        player,
    timeDimension: timeDimension,
    position:      'bottomleft',
    autoPlay:      true,
    minSpeed:      1,
    speedStep:     0.5,
    maxSpeed:      15,
    timeSliderDragUpdate: true
};

var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
map.addControl(timeDimensionControl);

var icon = L.icon({
    iconUrl: 'images/sailing-boat.png',
    iconSize: [22, 22],
    iconAnchor: [5, 25]
});

var customLayer = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {
                icon: icon
            });
        }
        return L.circleMarker(latLng);
    }
});

function createGPXLayer(gpxFile, color) {
    // define color
    var customLayer = L.geoJson(null, {
        // http://leafletjs.com/reference.html#geojson-style
        style: function(feature) {
            return { color: color };
        }
    });

    var gpxLayer = omnivore.gpx(gpxFile, null, customLayer).on('ready', function() {
        map.fitBounds(gpxLayer.getBounds(), {
            paddingBottomRight: [40, 40]
        });
    });

    var gpxTimeLayer = L.timeDimension.layer.geoJson(gpxLayer, {
        updateTimeDimension: true,
        addlastPoint: true,
        waitForReady: true
    });

    return [gpxLayer, gpxTimeLayer];
}

var overlayMaps = {};
var defaultLayer;

r1GPXFiles.forEach(function(gpxData, index) {
    var [gpxLayer, gpxTimeLayer] = createGPXLayer(gpxData.path, gpxData.color);
    overlayMaps[gpxData.title] = gpxTimeLayer;

    if (index === 0) {
        defaultLayer = gpxTimeLayer;
    }
});

L.control.layers(null, overlayMaps).addTo(map);

defaultLayer.addTo(map);

windbarbs.forEach(function(windData, index) {
    var icon = L.WindBarb.icon({lat:50, deg: windData.deg, speed: windData.speed});
    // TODO: set lat/lon
    var marker = L.marker([51.05, 2.36], {icon: icon}).addTo(map);
    
});

