/*jshint esversion: 6 */
const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    const endPoint = `https://api.darksky.net/forecast/e0fdbc783456e99e64fe1c2e6c85b6b1/${latitude},${longitude}`;
    request({
            url: endPoint,
            json: true
        },
        (error, response, body) => {
            if (error) {
                callback('Unable to connect to forecast service');
            } else if (response.statusCode == 400 || response.statusCode == 404) {
                callback('Unable to fetch weather');
            } else if (response.statusCode == 200) {
                callback(undefined, body.currently);
            }
        });
};

module.exports.getWeather = getWeather;