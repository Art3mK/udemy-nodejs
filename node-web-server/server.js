const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() + 1;
});

app.use((req,res, next) => {
    var log = `${new Date().toString()}: method: ${req.method}, url: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('screamIt', (input) => {
    return input.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        welcomeMessage: "Превед, медвед!!1!",
        pageTitle: 'Хомяк'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Err message'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 12947');
});