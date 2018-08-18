/*jshint esversion: 6 */
const request = require('request');
const yargs = require('yargs');
const clima = require('./weather/weather');
const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        const latitude = results.latitude;
        const longitude = results.longitude;
        clima.getWeather(latitude, longitude, (werrorMessage, weatherResults) => {
            if (werrorMessage) {
                console.log(werrorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
                // console.log(weatherResults);
                // console.log(JSON.stringify(weatherResults, undefined, 2));
            }
        });
    }
});



// https://api.darksky.net/forecast/e0fdbc783456e99e64fe1c2e6c85b6b1/37.8267,-122.4233