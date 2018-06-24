const request = require('request');

request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Rio%20nazas%203042%20nuevo%20mexicali&key=AIzaSyDHht-qr0W7TYcKM8f-trqJGSf9q8fpm8g',
        json: true
    },
    (error, response, body) => {
        console.log(body);
    });