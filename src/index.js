const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhcSIsImEiOiJjajhicnVxNGswMTlkMnFwbXdjbXNnbm9zIn0.rKQdLP-JkTSZjpLH0-sLTg';

const map = new mapboxgl.Map({
  container: 'map',
  center: [-73.930000, 40.738913], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activity', [-74.009151, 40.705086]);
marker.addTo(map);
