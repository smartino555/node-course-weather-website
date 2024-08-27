const request = require('postman-request');


const weather = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a6dc6d78797682d1b0e1227e1046b1fb&query=' + address.latitude + ',' + address.longitude + '&units=f';

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);

        } else {
            const { temperature, precip, feelslike, humidity } = response.body.current;
            callback(undefined, {
                description: response.body.current.weather_descriptions[0],
                temperature: temperature,
                precipitation: precip,
                feels_like: feelslike,
                place: address.location,
                humidity: humidity
            });
        }

    });
}

module.exports = weather;