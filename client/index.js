const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhcSIsImEiOiJjajhicnVxNGswMTlkMnFwbXdjbXNnbm9zIn0.rKQdLP-JkTSZjpLH0-sLTg';

const map = new mapboxgl.Map({
  container: 'map',
  center: [-73.930000, 40.738913], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

var data;
fetch('/api')
  .then(result => result.json())
  .then(data => {
    const hotelSelector = document.getElementById('hotel-selector');
    const restaurantSelector = document.getElementById('restaurant-selector');
    const activitySelector = document.getElementById('activity-selector');

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

document.getElementById('hotel-add').addEventListener('click', (e) => {
  const type = e.target.id.split('-')[0] //restaurant
  const selector = document.getElementById(type + '-selector')
  console.log(selector.options[selector.selectedIndex].value); //id of hotel


});
document.getElementById('restaurant-add');
document.getElementById('activity-add');

function addItinerary () {}

const marker = buildMarker('activity', [-74.009151, 40.705086]);
marker.addTo(map);
