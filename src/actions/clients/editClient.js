const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
const getToken = require('../../../config/token')
const $ = require('jquery')

const ip = connectSRV();
const token = getToken();

var cli = ipcRenderer.sendSync('clientInfo', '');

document.getElementById("Name").value = cli.client;
document.getElementById("Plan").value = cli.plan;
document.getElementById("Location").value = cli.location;


async function editCli(){

    var client = document.getElementById("Name").value;
    var plan = document.getElementById("Plan").value;
    var location = document.getElementById("Location").value;

    console.log(client)
    console.log(plan)
    console.log(location)

    await axios({
    method: 'post',
    url: `${ip}api/clients`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
    data: {
        name: client,
        id: cli.id,
        plan: plan,
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