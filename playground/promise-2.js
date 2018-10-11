const clima = require('../weather/weather');
const geocode = require('../geocode/geocode');

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            geocode.geocodeAddress(address, (errorMessage, results) => {
                if (errorMessage) {
                    reject(errorMessage);
                } else {
                    resolve(results);
                }
            });
        }, 500);
    });


};


geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});