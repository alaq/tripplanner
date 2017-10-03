const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const {
  db,
  Place,
  Hotel,
  Restaurant,
  Activity
} = require('./models');

const app = express();

app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static('public'));

app.get('/api', (req, res, next) => {
  let hotel_request = Hotel.findAll({include: [{all: true}]});
  let restaurant_request = Restaurant.findAll({include: [{all: true}]});
  let activity_request = Activity.findAll({include: [{all: true}]});

  Promise.all([hotel_request, restaurant_request, activity_request])
  .then(data => {
    let output = {hotels: data[0], restaurants: data[1], activities: data[2]};
    res.json(output);
  });
});

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.send('An error was encountered');
});

app.listen(3000, function () {
  console.log('server listening on 3000');
  db
    .sync()
    .then(function () {
      console.log('Sychronized the database');
    })
    .catch(function(err) {
      console.error('oh no!', err, err.stack);
    });
});
