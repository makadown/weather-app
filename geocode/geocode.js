/*jshint esversion: 6 */
const request = require('request');


var geocodeAddress = ((address, callback) => {

    // 1301 Lombard street
    // console.log(argv);
    const encodedAddress = encodeURIComponent(address);
    const endPoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDHht-qr0W7TYcKM8f-trqJGSf9q8fpm8g`;

    request({
            url: endPoint,
            json: true
        },
        (error, response, body) => {

            if (error) {
                callback('Unable to connect to google service');
            } else if (body.status === 'ZERO_RESULTS') {
                callback('Unable to find that addresss');
            } else if (body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
});

module.exports.geocodeAddress = geocodeAddress;