const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
const $ = require('jquery')

const ip = connectSRV();
var id = ipcRenderer.sendSync('paymentId', '');

console.log(id)

var id, name, plan, location


//Get the information of the client based on the id given by the main process sent from the client.js
axios({
    method: 'get',
    url: `${ip}api/clients/client/${id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'},
 
})
.then(function (response){
    
    console.log(response)

    id = response.data.id;
    name = response.data.name;
    plan = response.data.plan

    document.getElementById("clientId").innerHTML = response.data.id;
    document.getElementById("clientName").innerHTML = response.data.name;
    document.getElementById("plan").innerHTML = response.data.plan;
    document.getElementById("paymentCash").min = response.data.plan
    document.getElementById("paymentCash").value = response.data.plan
    document.getElementById("location").innerHTML = response.data.location;

})

const payment = async () => {

    var cash = $("#paymentCash").val()
    var monthPayment = $("#paymentMonth").val()

    //If there was no monthPaymnet input Send invalid message
    if(monthPayment === "") {

        document.getElementById("noSuccess").textContent += "Agregar Mes"

        //Wait 2 seconds before erasing the message
        setTimeout(function () {
           
            document.getElementById("noSuccess").textContent = ""
            
        }, 2000)

        
    }
    else{

        console.log(cash)
        console.log(monthPayment)

        //If cash is more or equal to the amount to pay, go with the transaction
        if(cash >= plan){

            //Do a call to get the number of ticket documents to increment the id number
            await axios({
                method: 'get',
                url: `${ip}api/pos/numOfTickets`,
                headers: {
                    'content-type': 'application/json',
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
                }
            })
            .then(async function (response){

                console.log("Response data: " + response.data)
                numOfTickets = response.data
                
                var total = parseInt(plan, 10)

                //Increment the number of tickets
                numOfTickets = numOfTickets + 1

                console.log(numOfTickets)

                //Save the client payment
                await axios({
                    method: 'post',
                    url: `${ip}api/clients/clientPayment/${id}`,
                    headers: {
                        'content-type': 'application/json',
                        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
                    },
                    data: {
                        paymentMonth: monthPayment
                    }
                })
                .then(async function (response) {

                    if(response.data === "Success"){
                        console.log("Updating client Success")
                    }

                })

                //Add Ticket to collection
                await axios({
                    method: 'post',
                    url: `${ip}api/pos/addTicket`,
                    headers: {
                        'content-type': 'application/json',
                        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
                    },
                    data: {
                        id: numOfTickets,
                        client: name,
                        total: total
                    }
                })
                .then(async function (response) {
        
                    console.log(response.data)

                    if(response.data === "Success"){

                        console.log("Adding ticket Success")

                        document.getElementById("Success").textContent += `Success!!`
                    }  
                });
            });           

            var cashBack = cash - plan

            $("#cshBack").text("Cambio: " + cashBack.toFixed(2))

            var button = '<button type="button" class="btn btn-primary" onclick="ready()">Listo</button>'
            
            document.getElementById("addBtn").innerHTML = button

        }
    }

    
}

const ready = async () => {
   
    //Wait 2 seconds before closing the window
    setTimeout(function () {
        // console.log("waited 3 seconds")
        ipcRenderer.invoke('closeCliPaymentWnd').then((result) => {
            
    })
    }, 2000)

}