const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhcSIsImEiOiJjajhicnVxNGswMTlkMnFwbXdjbXNnbm9zIn0.rKQdLP-JkTSZjpLH0-sLTg';

const map = new mapboxgl.Map({
  container: 'map',
  center: [-73.930000, 40.738913], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

let allData;
fetch('/api')
  .then(result => result.json())
  .then(data => {
    allData = data;
    const hotelSelector = document.getElementById('hotels-selector');
    const restaurantSelector = document.getElementById('restaurants-selector');
    const activitySelector = document.getElementById('activities-selector');

    data.hotels.forEach(hotel => {
      let option = document.createElement('option');
      option.value = hotel.id;
      option.innerHTML = hotel.name;
      hotelSelector.appendChild(option);
    });

    data.restaurants.forEach(restaurant => {
      let option = document.createElement('option');
      option.value = restaurant.id;
      option.innerHTML = restaurant.name;
      restaurantSelector.appendChild(option);
    });

    data.activities.forEach(activity => {
      let option = document.createElement('option');
      option.value = activity.id;
      option.innerHTML = activity.name;
      activitySelector.appendChild(option);
    });
  })
  .catch(console.error);


document.getElementById('hotels-add').addEventListener('click', addItinerary);
document.getElementById('restaurants-add').addEventListener('click', addItinerary);
document.getElementById('activities-add').addEventListener('click', addItinerary);

function addItinerary (e) {
  const type = e.target.id.split('-')[0] //restaurant
  const selector = document.getElementById(type + '-selector');
  const retrievedPlace = allData[type].filter(function (place) {
    return place.id == selector.options[selector.selectedIndex].value;
  })[0];
  const marker = buildMarker(type, retrievedPlace.place.location);
  marker.addTo(map);
}

const marker = buildMarker('activities', [-74.009151, 40.705086]);
marker.addTo(map);
