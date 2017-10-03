const mapbox = require('mapbox-gl');
const iconURLs = {
  hotels: "http://i.imgur.com/D9574Cu.png",
  restaurants: "http://i.imgur.com/cqR6pUI.png",
  activities: "http://i.imgur.com/WbMOfMl.png"
}

const buildMarker = (str, coordArr) => {
  return new mapboxgl.Marker(str).setLngLat(coordArr);
}

module.exports = buildMarker;
