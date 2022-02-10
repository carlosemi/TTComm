const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
<<<<<<< HEAD
//const getToken = require('../../../config/token')
const $ = require('jquery')

const ip = connectSRV();
//const token = getToken();
=======
const getToken = require('../../../config/token')
const $ = require('jquery')

const ip = connectSRV();
const token = getToken();
>>>>>>> master

var cli = ipcRenderer.sendSync('clientInfo', '');

document.getElementById("Name").value = cli.client;
document.getElementById("Plan").value = cli.plan;
document.getElementById("Location").value = cli.location;


async function editCli(){

    var client = document.getElementById("Name").value;
    var plan = document.getElementById("Plan").value;
    var location = document.getElementById("Location").value;
<<<<<<< HEAD
    var phoneNumber = document.getElementById("Phone").value;

    // console.log(client)
    // console.log(plan)
    // console.log(location)

    await axios({
    method: 'post',
    url: `${ip}api/clients/update`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
=======

    console.log(client)
    console.log(plan)
    console.log(location)

    await axios({
    method: 'post',
    url: `${ip}api/clients`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': token},
>>>>>>> master
    data: {
        name: client,
        id: cli.id,
        plan: plan,
<<<<<<< HEAD
        phoneNumber: phoneNumber,
=======
>>>>>>> master
        location: location
    }
    })
    .then(function (response){
        
        console.log(response.data)

        if(response.data ==='Success'){
            
            document.getElementById("Success").textContent += `Success!!`

            //Wait 2 seconds before closing the window
            setTimeout(function () {
            // console.log("waited 3 seconds")
            ipcRenderer.invoke('closeClientEditWnd').then((result) => {
                
            })
            }, 2000)
            
        }
    })

}