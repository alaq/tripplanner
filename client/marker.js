const mapboxgl = require("mapbox-gl");

function markerFactory (type, longlat) {
  const marker = document.createElement('div');
  marker.style.width = "32px";
  marker.style.height = "39px";

  if (type === 'activities') {
    marker.style.backgroundImage = 'url(http://i.imgur.com/WbMOfMl.png)';
  } else if (type === 'hotels') {
    marker.style.backgroundImage = 'url(http://i.imgur.com/D9574Cu.png)';
  } else if (type === 'restaurants') {
    marker.style.backgroundImage = 'url(http://i.imgur.com/cqR6pUI.png)';
  }

  return new mapboxgl.Marker(marker).setLngLat(longlat);
}

module.exports = markerFactory;
