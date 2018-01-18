const express = require('express');

var app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    // res.send('<h2>Hello express</h2>');
    res.send({
        name: 'Everybody',
        likes: [
            'Womens',
            'Boobs'
        ]
    })
});

app.get('/about', (req, res) => {
    res.send('About page here');
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Err message'
    });
})

app.listen(12947, () => {
    console.log('Server is up on port 12947');
});