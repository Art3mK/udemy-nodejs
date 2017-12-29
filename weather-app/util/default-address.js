const fs = require('fs');
const data_file_path = './data/default-address.json';

var get = () => {
    return new Promise((resolve, reject) => {
        try {
            var address = fs.readFileSync(data_file_path);
            address = JSON.parse(address);
            resolve(address);
        } catch (e) {
            reject(e);
        }
    })
}

var set = (address) => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFileSync(data_file_path, JSON.stringify(address));
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

var remove = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.unlinkSync(data_file_path);
            resolve('Default address removed');
        } catch (e) {
            if (e.code === 'ENOENT') {
                resolve('No default address found');
            }
            reject(e);
        }
    })
}

module.exports = {
    get,
    set,
    remove
}