const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
const $ = require('jquery')

const ip = connectSRV();
var id = ipcRenderer.sendSync('paymentId', '');

console.log(id)

axios({
    method: 'get',
    url: `${ip}api/clients/client/${id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'},
 
    })
    .then(function (response){
        
        console.log(response)

        document.getElementById("clientId").innerHTML = response.data.id;
        document.getElementById("clientName").innerHTML = response.data.name;
        document.getElementById("plan").innerHTML = response.data.plan;
        document.getElementById("paymentCash").min = response.data.plan
        document.getElementById("paymentCash").value = response.data.plan
        document.getElementById("location").innerHTML = response.data.location;
        document.getElementById("clientId").innerHTML = response.data.id;

    })