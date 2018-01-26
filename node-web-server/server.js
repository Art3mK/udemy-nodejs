const express = require('express');
const hbs = require('hbs');
var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() + 1;
});

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