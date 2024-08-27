const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1Ijoic21hcnRpbm81NTUiLCJhIjoiY20wOGR0b2VjMWc1cTJqcG15Y2l0cWRiZiJ9.rHCjMrnvsPFpbabNSU-rsA&limit=1';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            const { properties } = response.body.features[0];
            callback(undefined, {
                location: properties.full_address,
                latitude: properties.coordinates.latitude,
                longitude: properties.coordinates.longitude
            });

        }
    });
}

module.exports = geocode;