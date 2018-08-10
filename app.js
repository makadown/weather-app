/*jshint esversion: 6 */
const request = require('request');
const yargs = require('yargs');

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
        const endPoint = `https://api.darksky.net/forecast/e0fdbc783456e99e64fe1c2e6c85b6b1/${latitude},${longitude}`;
        request({
                url: endPoint,
                json: true
            },
            (error, response, body) => {
                if (error) {
                    console.log('Unable to connect to forecast service');
                } else if (response.statusCode == 400 || response.statusCode == 404) {
                    console.log('Unable to fetch weather');
                } else if (response.statusCode == 200) {
                    console.log(body.currently);
                }
            });
    }
});



// https://api.darksky.net/forecast/e0fdbc783456e99e64fe1c2e6c85b6b1/37.8267,-122.4233