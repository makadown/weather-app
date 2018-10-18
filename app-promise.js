/*jshint esversion: 6 */
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    }).help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDHht-qr0W7TYcKM8f-trqJGSf9q8fpm8g`;

axios.get(geoCodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.darksky.net/forecast/e0fdbc783456e99e64fe1c2e6c85b6b1/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    // console.log(weatherURL);

    return axios.get(weatherURL);
}).then((response) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log('Temperature: ', temperature);
    console.log('Apparent Temperature: ', apparentTemperature);
}).catch(function(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
});

// https://api.darksky.net/forecast/e0fdbc783456e99e64fe1c2e6c85b6b1/37.8267,-122.4233