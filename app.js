/*jshint esversion: 6 */
const request = require('request');
const yargs = require('yargs');

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

// 1301 Lombard street
// console.log(argv);
const encodedAddress = encodeURIComponent(argv.address);
const endPoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDHht-qr0W7TYcKM8f-trqJGSf9q8fpm8g`;

request({
        url: endPoint,
        json: true
    },
    (error, response, body) => {

        if (error) {
            console.log('Unable to connect to google service');
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Unable to find that addresss');
        } else if (body.status === 'OK') {

            // console.log(JSON.stringify(body, undefined, 2));
            // console.log(JSON.stringify(response, undefined, 2));
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude : ${body.results[0].geometry.location.lng}`);
        }
    });