//Get the user authenticated token
const config = require('config')
const token = config.get('x-auth-token')

const getToken = () => {

    return token;
    
}

module.exports = getToken;