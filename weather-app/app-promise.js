const yargs = require('yargs');
const chalk = require('chalk');
const log   = console.log;
const error = chalk.bold.red;

const weather = require('./weather/weather.js');
const default_address = require('./util/default-address.js');

const argv = yargs
    .options({
        address: {
            alias: 'a',
            demand: false,
            describe: 'Address to fetch weather for',
            string: true
        },
        'set-default-address': {
            alias: 's',
            demand: false,
            describe: 'Set default address',
            boolean: true,
            conflicts: 'remove-default-address',
            coerce: (s) => s || undefined
        },
        'remove-default-address': {
            alias: 'r',
            demand: false,
            describe: 'Remove previously set default address',
            boolean: true,
            coerce: (r) => r || undefined
        }
    })
    .implies({
        'set-default-address':'address'
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.setDefaultAddress) {
    default_address
        .set({'address':argv.address})
        .then(() => {
            log(chalk.green('Default address was set'));
        })
        .catch((err) => {
            log(error(`Can't set default address, err: ${err}`));
        })
}

if (argv.removeDefaultAddress) {
    default_address
        .remove()
        .then((message) => {
            log(chalk.green(message));
        })
        .catch((err) => {
            log(error(`Can't remove default address, err: ${err}`));
        })
}

if (!argv.address) {
    default_address.get()
        .then((addressObj) => {
            weather.getCurrent(addressObj.address);
        })
        .catch((err) => {
            log(error(`Error: Can't fetch default address, err: ${err}`));
            log(error('Error: Can\'t get default address nor it was given as parameter. quiting'));
            process.exit(1);
        })
} else {
    weather.getCurrent(argv.address);
}