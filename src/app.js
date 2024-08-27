const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sebastian Martino'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page for you!',
        name: 'Sebastian Martino',
        tacos: 'tacos'
    });
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sebastian Martino'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        weather({ latitude, longitude, location }, (error, weatherData) => {
            if (error) {
                return res.send({ error });
            }

            res.send(weatherData);
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });

    }
    res.send({
        products: []
    });

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'Sebastian Martino',
        whereFrom: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'Sebastian Martino',
        whereFrom: 'Page not found!'
    });
});

app.listen((3000), () => {
    console.log('Server is up on port 3000.');
});
