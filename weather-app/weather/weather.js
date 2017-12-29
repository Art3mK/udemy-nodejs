
const axios = require('axios');
const constants = require('../data/constants.js');

var getCurrent = (address) => {
    var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;
    if (constants.GOOGLE_MAPS_API_KEY) {
        geocodeURL += `&key=${constants.GOOGLE_MAPS_API_KEY}`;
    }

    axios.get(geocodeURL)
        .then((res) => {
            if (res.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find that address');
            }
            var lat = res.data.results[0].geometry.location.lat;
            var lng = res.data.results[0].geometry.location.lng;
            var weatherURL = `https://api.darksky.net/forecast/${constants.DARKSKY_API_KEY}/${lat},${lng}?units=si`;
            address = res.data.results[0].formatted_address;
            return axios.get(weatherURL);
        })
        .then((weather) => {
            var temp = weather.data.currently.temperature;
            var humidity = `${parseInt(weather.data.currently.humidity*100,10)}%`;
            var info = {
                Address: address,
                Temperature: weather.data.currently.temperature,
                Humidity: `${parseInt(weather.data.currently.humidity*100,10)}%`,
                Pressure: weather.data.currently.pressure
            }
            console.log(JSON.stringify(info, undefined, 2));
        })
        .catch((err) => {
            if (err.code === 'ENOTFOUND') {
                console.log('Host name not found');
            } else {
                console.log(err.message);
            }
        })
}

module.exports = {
    getCurrent
}