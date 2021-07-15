//Get the ip for the server
const config = require('config')
const ip =  config.get('ip')
const localip = config.get('localip')

const connectSRV = () => {
    
    //Either return local ip or public ip depending on which server your working on
    
    //return ip;
    return localip;
    
    //console.log(localip)
}

module.exports = connectSRV;