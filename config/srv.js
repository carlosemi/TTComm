//Get the ip for the server
const config = require('config')
const ip =  config.get('ip')

const connectSRV = () => {
    return ip;
    console.log(ip)
}

module.exports = connectSRV;