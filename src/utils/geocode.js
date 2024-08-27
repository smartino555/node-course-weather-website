const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.positionstack.com/v1/forward?access_key=ea2121ec16ec64c3347e7ce112d910ec&query=' + encodeURIComponent(address);

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            const { properties } = response.body.data[0];
            callback(undefined, {
                location: properties.label,
                latitude: properties.latitude,
                longitude: properties.longitude
            });

        }
    });
}

module.exports = geocode;