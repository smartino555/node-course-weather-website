const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.positionstack.com/v1/forward?access_key=ea2121ec16ec64c3347e7ce112d910ec&query=' + encodeURIComponent(address) + '&limit=1';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.data.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            const { body } = response;
            console.log(body.data[0]);
            callback(undefined, {
                location: body.data[0].label,
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            });

        }
    });
}

module.exports = geocode;