const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading Weather Data!';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = '';
                messageTwo = data.error;
            }
            const messageToPrint = data.description + ' with a ' + data.precipitation + '% chance of showers. The temperature is currently ' + data.temperature + ' degrees. In the location ' + data.place;

            messageOne.textContent = '';
            messageTwo.textContent = messageToPrint
        });
    });
});