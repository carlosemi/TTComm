//import axios from 'axios';
const axios = require('axios')

const setAuthToken = token => {

    console.log("This happened")
    
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

// export default setAuthToken;
module.exports = setAuthToken;