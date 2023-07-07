console.log("get file : " + gpx_file);
console.log("wind is  : " + winddir);

// tools
function calculateBearing(lat1, lon1, lat2, lon2) {
    var dLon = (lon2 - lon1) * Math.PI / 180;

    var y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    var x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
        Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);

    var bearing = Math.atan2(y, x) * 180 / Math.PI;

    return Math.round((bearing + 360) % 360);
}

//  Custom chart handlers 
// heading calculation
L.Control.Elevation.MyHDG = function () {
    return {
        name: 'HDG',      // <-- Your custom option name (eg. "HDG: true")
        unit: '°',
        meta: 'HDG',         // <-- point.meta.hr
        coordinateProperties: ["HDG"], // List of GPX 
        // pointToAttr: (point, i) => (point.hr ?? point.meta.hr ?? point.prev('HDG')) || 0,
        pointToAttr: (point, i) => {
            let hdg = calculateBearing(this._data[i].latlng.lat,
                this._data[i].latlng.lng,
                this._data[i > 0 ? i - 1 : i].latlng.lat,
                this._data[i > 0 ? i - 1 : i].latlng.lng,
            );
            // pace
            //let dx   = (this._data[i].dist - this._data[i > 0 ? i - 1 : i].dist) * 1000;
            //let dt   = this._data[i].time - this._data[ i > 0 ? i - 1 : i].time;
            //return dx > 0 ? Math.abs((dt / dx) / 10) : 0;
            return Math.round(hdg);
        },
        // not meanningfull...
        stats: {
            max: (HDG, max = -Infinity) => (HDG > max ? HDG : max),
            min: (HDG, min = +Infinity) => (HDG < min ? HDG : min),
            avg: (HDG, avg = 0, idx = 1) => (HDG + avg * (idx - 1)) / idx,
        },
        scale: {
            axis: "y",
            position: "left",
            scale: { min: 0, max: 360 },
            tickPadding: 45,
            labelX: -18,
            labelY: -8,
        },
        path: {
            label: 'HDG',
            yAttr: 'HDG',
            scaleX: 'distance',
            scaleY: 'HDG',
            color: 'white',
            strokeColor: 'red',
            strokeOpacity: "0.85",
            fillOpacity: "0.1",
        },
        tooltip: {
            chart: (item) => L._("HDG: ") + item.HDG + " °" ,
            marker: (item) => Math.round(item.HDG) + " °" ,
            order: 1
        },
        summary: {
            "minHDG": {
                label: "Min HDG: ",
                value: (track, unit) => Math.round(track.HDG_min || 0) + '&nbsp;' + unit,
                // order: 30
            },
            "maxHDG": {
                label: "Max HDG: ",
                value: (track, unit) => Math.round(track.HDG_max || 0) + '&nbsp;' + unit,
                // order: 30
            },
            "avgHDG": {
                label: "Avg HDG: ",
                value: (track, unit) => Math.round(track.HDG_avg || 0) + '&nbsp;' + unit,
                // order: 20
            },
        }
    };
};

// VMG calculation
L.Control.Elevation.MyVMG = function () {
    return {
        name: 'VMG',      // <-- Your custom option name (eg. "VMG: true")
        unit: 'knts',
        meta: 'VMG',         // <-- point.meta.hr
        coordinateProperties: ["VMG"], // List of GPX 
        // pointToAttr: (point, i) => (point.hr ?? point.meta.hr ?? point.prev('VMG')) || 0,
        pointToAttr: (point, i) => { // pace sample            
            /*
            let hdg = calculateBearing(this._data[i].latlng.lat,
                this._data[i].latlng.lng,
                this._data[i > 0 ? i - 1 : i].latlng.lat,
                this._data[i > 0 ? i - 1 : i].latlng.lng,
                );
            */
            // hdg is in degree
            // vmg = cos(hdg-winddir)*speed
            // this speed should be in knts ?
            //TODO: handle upwind/downwind
            let winangle = (this._data[i].HDG - winddir);
            let vmg = Math.round(
                Math.cos(winangle * Math.PI / 180) * this._data[i].speed * 1.9438
            );
            /*
            if ((winangle > 90) && (winangle < 270)) {
                // downwind...
                vmg = -vmg;
            }
            */
           // downwind neg
           vmg = Math.abs(vmg);
            //let dx   = (this._data[i].dist - this._data[i > 0 ? i - 1 : i].dist) * 1000;
            //let dt   = this._data[i].time - this._data[ i > 0 ? i - 1 : i].time;
            //return dx > 0 ? Math.abs((dt / dx) / 10) : 0;
            return vmg;
        },
        // 
        stats: {
            max: (VMG, max = -Infinity) => (VMG > max ? VMG : max),
            min: (VMG, min = +Infinity) => (VMG < min ? VMG : min),
            avg: (VMG, avg = 0, idx = 1) => (VMG + avg * (idx - 1)) / idx,
        },
        scale: {
            axis: "y",
            position: "left",
            scale: { min: -30, max: 30 },
            tickPadding: 16,
            labelX: -58,
            labelY: -8,
        },
        path: {
            label: 'VMG',
            yAttr: 'VMG',
            scaleX: 'distance',
            scaleY: 'VMG',
            color: 'white',
            strokeColor: 'green',
            strokeOpacity: "0.85",
            fillOpacity: "0.1",
        },
        tooltip: {
            chart: (item) => L._("VMG: ") + item.VMG + " knts",
            marker: (item) => Math.round(item.VMG) + " knts",
            order: 1
        },
        summary: {
            "minVMG": {
                label: "Min VMG: ",
                value: (track, unit) => Math.round(track.VMG_min || 0) + '&nbsp;' + unit,
                // order: 30
            },
            "maxVMG": {
                label: "Max VMG: ",
                value: (track, unit) => Math.round(track.VMG_max || 0) + '&nbsp;' + unit,
                // order: 30
            },
            "avgVMG": {
                label: "Avg VMG: ",
                value: (track, unit) => Math.round(track.VMG_avg || 0) + '&nbsp;' + unit,
                // order: 20
            },
        }
    };
};


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
var osmsea = new L.TileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 20
}).addTo(map);

// use groups ? 
var seamap = L.layerGroup([OpenStreetMap_France, osmsea]);

//add basemaps in an array
//baseMaps={"OSM":tiles,"COLOR":osmsea};

//add a control layer to switch on the both basemaps
//ControlLayer=L.control.layers(baseMaps).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({ imperial: false, metric: true }).addTo(map);

// Icon options
// Creating custom icons
var tack_icon = L.icon({
    iconUrl: 'tack.png',
    iconSize: [24, 24]
});

var gybe_icon = L.icon({
    iconUrl: 'jibe.png',
    iconSize: [24, 24]
});

/*
var boatMarker = L.boatMarker(51.070635, 2.362061, {
    color: "#f1c40f", 	// color of the boat
    idleCircle: false	// if set to true, the icon will draw a circle if
                        // boatspeed == 0 and the ship-shape if speed > 0
});
*/

// handle some event
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

// Full list options at "leaflet-elevation.js"
var elevation_options = {
    theme: "lightblue-theme",
    detached: true,
    elevationDiv: "#elevation-div",
    autohide: false,
    collapsed: false,
    position: "bottomleft",
    closeBtn: true,
    followMarker: true,
    autofitBounds: true,
    imperial: false,
    // [Lat, Long] vs [Long, Lat] points. (leaflet default: [Lat, Long])
    reverseCoords: false,
    downloadLink: false,
    ruler: true,
    legend: true,
    almostOver: true,
    distanceMarkers: false,
    edgeScale: false,
    hotline: true,
    timestamps: false,
    // Summary track info style: "inline" || "multiline" || false
    summary: 'inline',
    // Acceleration chart profile: true || "summary" || "disabled" || false
    acceleration: false,
    // Slope chart profile: true || "summary" || "disabled" || false
    slope: false,
    // Speed chart profile: true || "summary" || "disabled" || false
    speed: true,
    speedLabel: 'knts',
    speedFactor: 0.539956803455724, // kmh => nds
    //speedFactor: 1.9438,
    // Altitude chart profile: true || "summary" || "disabled" || false
    altitude: false,
    elevation: false,
    // Display time info: true || "summary" || false
    time: true,
    // Display distance info: true || "summary" || false
    distance: true,
    // Display track waypoints: true || "markers" || "dots" || false
    waypoints: true,
    direction: true,
    // Toggle custom waypoint icons: true || { associative array of <sym> tags } || false
    wptIcons: {
        '': L.divIcon({
            className: 'elevation-waypoint-marker',
            html: '<i class="elevation-waypoint-icon"></i>',
            iconSize: [30, 30],
            iconAnchor: [8, 30],
        }),
    },

    // Toggle waypoint labels: true || "markers" || "dots" || false
    wptLabels: true,
    // Render chart profiles as Canvas or SVG Paths
    preferCanvas: true,
    // initital state
    HDG: true,
    VMG: true,
    handlers: [
        ...L.Control.Elevation.prototype.options.handlers,  // built-in handlers
        'Runner',                                           // same as: import('../src/handlers/runner.js')
        "MyHDG",
        "MyVMG",
    ],
    runnerOptions: {
        polyline: {
            color: 'red',
            attribution: '| Powered by: © <a href="https://github.com/Igor-Vladyka/leaflet.motion">Leaflet.Motion</a>',
        },
        motion: {
            auto: false,
            speed: 1500,
        }
    },

    //handlers: [                               // <-- A list of: Dynamic imports || "ClassName" || function Name() { return { /* a custom object definition */ } }
    //'Distance',                           // <-- same as: import("../src/handlers/distance.js")
    //'Time',                               // <-- same as: import("../src/handlers/time.js")                        
    //'Speed',                              // <-- same as: import("../src/handlers/speed.js")
    //'Acceleration',                       // <-- same as: import("../src/handlers/acceleration.js")            
    //"HDG",                           // <-- same as: import("../src/handlers/HDG.js")            
    //L.Control.Elevation.MyHDG,          // <-- see custom functions declared above
    // L.Control.Elevation.MyCadence,     // <-- see custom functions declared above
    //L.Control.Elevation.MyPace,           // <-- see custom functions declared above
    //],

    yAttr: 'speed',
    yScale: 'speed',
};


// Instantiate elevation control.
let controlElevation = L.control.elevation(elevation_options).addTo(map);

//let controlElevation = L.control.elevation(opts.elevationControl.options).addTo(map);
let controlLayer = L.control.layers(null, null, null); // opts.layersControl.options);

controlElevation.on('eledata_loaded', ({layer, name}) => controlLayer.addTo(map) && layer.eachLayer((trkseg) => trkseg.feature.geometry.type != "Point" && controlLayer.addOverlay(trkseg, trkseg.feature && trkseg.feature.properties && trkseg.feature.properties.name || name)));
        
// Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
controlElevation.load(gpx_file);

map.on('eledata_loaded', function (e) {
    // Start "walking" animation
    //controlElevation.animate(layer, 1500);

    var q = document.querySelector.bind(document);
    var track = e.track_info;
    var layer = e.layer;

    var allayers = layer.getLayers();

    console.log("ele data loaded");

    // Default summary info
    /*
    q('.totlen .summaryvalue').innerHTML = track.distance.toFixed(2) + " km";
    q('.maxele .summaryvalue').innerHTML = track.elevation_max.toFixed(2) + " m";
    q('.minele .summaryvalue').innerHTML = track.elevation_min.toFixed(2) + " m";
    */
    // Advanced summary info
    //layer.get_name(); // name of the GPX track
    //console.log("name "+ layer.get_name());        

    var datapt = allayers[0];
    var trackpoints = datapt.getLatLngs();

    console.log("point : " + trackpoints.length);

});
