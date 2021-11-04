const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
const getToken = require('../../../config/token')
const $ = require('jquery')

const ip = connectSRV();
const token = getToken();

var id = ipcRenderer.sendSync('paymentId', '');

console.log(id)

var id, name, plan, location, amountOwed

//Get the information of the client based on the id given by the main process sent from the client.js
axios({
    method: 'get',
    url: `${ip}api/clients/client/${id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
 
})
.then(function (response){
    
    console.log(response)

    id = response.data.id;
    name = response.data.name;
    plan = response.data.plan
   
    document.getElementById("clientId").innerHTML = response.data.id;
    document.getElementById("clientName").innerHTML = response.data.name;
    document.getElementById("plan").innerHTML = response.data.plan;
    document.getElementById("location").innerHTML = response.data.location;
    document.getElementById("creditOwed").innerHTML = "$ " + response.data.creditOwed;
})


const creditPurchase = async() => {

    var description = $("#description").val()
    var cost = $("#cost").val()

    console.log(description + cost)

    await axios({
        method: 'post',
        url: `${ip}api/clients/creditPurchase/${id}`,
        headers: {'content-type': 'application/json' , 
                    'x-auth-token': localStorage.token},
        data: {
            description: description,
            amount: cost
        }
        
    })
    .then(function (response){
        
        console.log(response)
    
        if(response.data){

            document.getElementById("Success").textContent += `Success!!`

            var button = '<button type="button" class="btn btn-primary" onclick="ready()">Listo</button>'
                
            document.getElementById("addBtn").innerHTML = button
        }
    
    })
    
}

const ready = async () => {
   
    //Wait 2 seconds before closing the window
    setTimeout(function () {
        // console.log("waited 3 seconds")
        ipcRenderer.invoke('closeCliCreditWnd').then((result) => {
            
    })
    }, 2000)

}