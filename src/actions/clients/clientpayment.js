const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
<<<<<<< HEAD
//const getToken = require('../../../config/token')
const $ = require('jquery')
const printT = require('../../../renderer')

const ip = connectSRV();
//const token = getToken();
var id = ipcRenderer.sendSync('paymentId', '');

//console.log(id)

var id, name, plan, location, amountOwed

//console.log(localStorage.token)
console.log("In clientPayment")
=======
const getToken = require('../../../config/token')
const $ = require('jquery')

const ip = connectSRV();
const token = getToken();
var id = ipcRenderer.sendSync('paymentId', '');

console.log(id)

var id, name, plan, location, amountOwed

>>>>>>> master

//Get the information of the client based on the id given by the main process sent from the client.js
axios({
    method: 'get',
    url: `${ip}api/clients/client/${id}`,
    headers: {'content-type': 'application/json' , 
<<<<<<< HEAD
                'x-auth-token': localStorage.token},
=======
                'x-auth-token': token},
>>>>>>> master
 
})
.then(function (response){
    
<<<<<<< HEAD
    //console.log(response)
=======
    console.log(response)
>>>>>>> master

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

//Get the total amount of credit owed
axios({
    method: 'get',
    url: `${ip}api/clients/creditTotal/${id}`,
    headers: {'content-type': 'application/json' , 
<<<<<<< HEAD
                'x-auth-token': localStorage.token},
=======
                'x-auth-token': token},
>>>>>>> master
 
})
.then(function (response){
    
<<<<<<< HEAD
    //console.log(response)
=======
    console.log(response)
>>>>>>> master

    amountOwed = response.data

    document.getElementById("creditOwed").innerHTML = amountOwed;


})

<<<<<<< HEAD
const payment = async (paymentType) => {

=======
const payment = async () => {
>>>>>>> master

    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth()+1)+'-'+today.getDate();

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

<<<<<<< HEAD
        //console.log(cash)
        //console.log(monthPayment)
=======
        console.log(cash)
        console.log(monthPayment)
>>>>>>> master

        //If cash is more or equal to the amount to pay, go with the transaction
        if(cash >= plan){

            //Do a call to get the number of ticket documents to increment the id number
            await axios({
                method: 'get',
                url: `${ip}api/pos/numOfTickets`,
                headers: {
                    'content-type': 'application/json',
<<<<<<< HEAD
                    'x-auth-token': localStorage.token
=======
                    'x-auth-token': token
>>>>>>> master
                }
            })
            .then(async function (response){

<<<<<<< HEAD
                //console.log("Response data: " + response.data)
=======
                console.log("Response data: " + response.data)
>>>>>>> master
                numOfTickets = response.data
                
                var total = parseInt(plan, 10)

                //Increment the number of tickets
                numOfTickets = numOfTickets + 1

<<<<<<< HEAD
                //console.log(numOfTickets)
=======
                console.log(numOfTickets)
>>>>>>> master

                //Save the client payment
                await axios({
                    method: 'post',
                    url: `${ip}api/clients/clientPayment/${id}`,
                    headers: {
                        'content-type': 'application/json',
<<<<<<< HEAD
                        'x-auth-token': localStorage.token
=======
                        'x-auth-token': token
>>>>>>> master
                    },
                    data: {
                        paymentMonth: monthPayment
                    }
                })
                .then(async function (response) {

                    if(response.data === "Success"){
<<<<<<< HEAD
                        //console.log("Updating client Success")
=======
                        console.log("Updating client Success")
>>>>>>> master
                    }


                })

                //Add Ticket to collection
                await axios({
                    method: 'post',
                    url: `${ip}api/pos/addTicket`,
                    headers: {
                        'content-type': 'application/json',
<<<<<<< HEAD
                        'x-auth-token': localStorage.token
=======
                        'x-auth-token': token
>>>>>>> master
                    },
                    data: {
                        id: numOfTickets,
                        client: name,
                        total: total,
<<<<<<< HEAD
                        monthPayment: monthPayment,
                        paymentType: paymentType
=======
                        monthPayment: monthPayment
>>>>>>> master
                    }
                })
                .then(async function (response) {
        
<<<<<<< HEAD
                    //console.log(response.data)

                    if(response.data === "Success"){

                        //console.log("Adding ticket Success")

                        document.getElementById("Success").textContent += `Success!!`

                        const ticketData = [
                            // {
                            //     type: 'image',                                       
                            //     path: path.join(__dirname, '../../../img/ttcomm.png'),     // file path
                            //     position: 'center',                                  // position of image: 'left' | 'center' | 'right'
                            //     width: '90px',                                           // width of image in px; default: auto
                            //     height: '90px',                                          // width of image in px; default: 50 or '50px'
                            // },
                            {
                                type: 'text',
                                value: 'TTCOMM',
                                style: 'margin-left: 20px ;font-size: 22px; color: black;'
                            },
                            {
                                type: 'text',
                                value: 'Venustiano Carranza 125 Zona Centro',
                                position: 'center',
                                style: 'font-size: 10px; color: black; font-weight: bold;'
                            },
                            {
                                type: 'text',
                                value: 'Telefono: 812 565 2245',
                                position: 'center',
                                style: 'font-size: 10px; color: black; font-weight: bold;'
                            },
                            {
                                type: 'text',
                                position: 'center',
                                value: 'Fecha de Hoy: ' + date,
                                style: 'font-size: 10px;  margin-top:15px; font-weight: bold; '
                            },
                            {
                                type: 'text',
                                position: 'center',
                                value: '_______________',
                                style: 'font-size: 18px; '
                            },
                            // {
                            //     type: 'text',
                            //     value: 'Id de ticket: ' + id,
                            //     style: 'font-size: 11px; color: black; margin-top:15px; font-weight: bold;'
                            // },
                            {
                                type: 'text',
                                value: 'Mes de pago: ' + monthPayment,
                                style: 'font-size: 11px; color: black; margin-top:15px; font-weight: bold;'
=======
                    console.log(response.data)

                    if(response.data === "Success"){

                        console.log("Adding ticket Success")

                        document.getElementById("Success").textContent += `Success!!`

                        var ticketData = [
                            {
                                type: 'text',
                                value: 'TTCOMM',
                                style: 'font-size: 20px; color: black;'
                            },
                            {
                                type: 'text',
                                value: date,
                                style: 'font-size: 16px;  margin-top:15px '
                            },
                            {
                                type: 'text',
                                value: '____________',
                                style: 'font-size: 18px; '
                            },{
                                type: 'text',
                                value: 'Id de ticket: ' + numOfTickets,
                                style: 'font-size: 11px; color: black; margin-top:15px'
                            },
                            {
                                type: 'text',
                                value: 'Mes de pago: ' + monthPayment,
                                style: 'font-size: 11px; color: black; margin-top:15px'
>>>>>>> master
                            },
                            {
                                type: 'text',
                                value: 'Cliente: ' + name,
<<<<<<< HEAD
                                style: 'font-size: 11px; color: black; margin-top:15px; font-weight: bold;'
                            },
                            {
                                type: 'text',
                                value: 'Plan: ' + plan,
                                style: 'font-size: 11px; color: black; margin-top:15px; font-weight: bold;'
                            },
                            {
                                type: 'text',
                                value: 'Total: $' + plan,
                                style: 'font-size: 11px; color: black; margin-top:15px;margin-left: 78px; font-weight: bold;'
                            },
                            // {
                            //     type: 'text',
                            //     value: 'Cambio: $',
                            //     style: 'font-size: 11px; color: black; margin-top:15px;margin-left: 63px; font-weight: bold;'
                            // },
                            {
                                type: 'qrCode',
                                 value: 'Ticket Id: ' + numOfTickets + '\n' + 'Id de Cliente: ' + id,
                                 height: 100,
                                 width: 100,
                                 style: 'margin-top: 250px; margin-left: 23px;'
                               },
                            {
                                type: 'text',
                                value: 'Gracias por su preferencia',
                                style: 'font-size: 10px; color: black; font-weight: bold;'
                            }
                        ]

                        //console.log(ticketData)

                        try {
                            //await ipcRenderer.send('print', ticketData)
                            printT(ticketData)
=======
                                style: 'font-size: 11px; color: black; margin-top:15px'
                            },
                            {
                                type: 'text',
                                value: 'Plan: ' + total,
                                style: 'font-size: 11px; color: black; margin-top:15px'
                            },
                            {
                                type: 'text',
                                value: 'Gracias por su preferencia',
                                style: 'font-size: 10px; color: black; margin-top:200px'
                            }
                        ]

                        console.log(ticketData)

                        try {
                            await ipcRenderer.send('print', ticketData)
>>>>>>> master
                        } catch (error) {
                            console.error(error)
                        }

                        var cashBack = cash - plan
            
                        $("#cshBack").text("Cambio: " + cashBack.toFixed(2))
            
                        var button = '<button type="button" class="btn btn-primary" onclick="ready()">Listo</button>'
                        
                        document.getElementById("addBtn").innerHTML = button
                        
                    }  
                });
            });           

            
        }
    }

    
}

<<<<<<< HEAD
const creditPayment = async(paymentType) => {
=======
const creditPayment = async() => {
>>>>>>> master

    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth()+1)+'-'+today.getDate();

    var creditPayment = $("#creditOwedPay").val()
    var name = $("#clientName").text()

    //If there is actual amount of credit Owed and if the credit Payment is greater than 0 (So it is an actual payment) 
    //do the payment
    if(amountOwed > 0 && creditPayment > 0){ 
        await axios({
            method: 'post',
            url: `${ip}api/clients/creditPayment/${id}`,
            headers: {'content-type': 'application/json' , 
<<<<<<< HEAD
                        'x-auth-token': localStorage.token},
=======
                        'x-auth-token': token},
>>>>>>> master
            data: {
                payment: creditPayment
            }
         
        })
        .then(async function (response){
            
<<<<<<< HEAD
            //console.log(response)
=======
            console.log(response)
>>>>>>> master
        
        
            document.getElementById("Success2").textContent += `Success!!`

<<<<<<< HEAD
            //Do a call to get the number of ticket documents to increment the id number
            await axios({
                method: 'get',
                url: `${ip}api/pos/numOfTickets`,
                headers: {
                    'content-type': 'application/json',
                    'x-auth-token': localStorage.token
                }
            })
            .then(async function (response){

                var numOfTickets = response.data

                //Increment the number of tickets
                numOfTickets = numOfTickets + 1
                
                //Add Ticket to collection
                await axios({
                    method: 'post',
                    url: `${ip}api/pos/addTicket`,
                    headers: {
                        'content-type': 'application/json',
                        'x-auth-token': localStorage.token
                    },
                    data: {
                        id: numOfTickets,
                        client: name,
                        total: creditPayment,
                        paymentType: paymentType
                    }
                })
            })
           
=======
>>>>>>> master
            //If the amount returned is less then 0 then that means you need to give cashback
            if(response.data < 0){

                //First make number positive
                var cashBack = Math.abs(response.data)

                $("#cshBack2").text("Cambio: " + cashBack.toFixed(2))

                
            }

            var ticketData = [
                {
                    type: 'text',
                    value: 'TTCOMM',
                    style: 'font-size: 20px; color: black;'
                },
                {
                    type: 'text',
                    value: date,
                    style: 'font-size: 16px;  margin-top:15px '
                },
                {
                    type: 'text',
                    value: '____________',
                    style: 'font-size: 18px; '
                },
                {
                    type: 'text',
                    value: 'Pago de Credito',
                    style: 'font-size: 11px; color: black; margin-top:15px'
                },
                {
                    type: 'text',
                    value: 'Cliente: ' + name,
                    style: 'font-size: 11px; color: black; margin-top:15px'
                },
                {
                    type: 'text',
                    value: 'Pago: ' + creditPayment,
                    style: 'font-size: 11px; color: black; margin-top:15px'
                },
                {
                    type: 'text',
                    value: 'Gracias por su preferencia',
                    style: 'font-size: 10px; color: black; margin-top:200px'
                }
            ]

<<<<<<< HEAD
            //console.log(ticketData)
=======
            console.log(ticketData)
>>>>>>> master

            try {
                await ipcRenderer.send('print', ticketData)
            } catch (error) {
                console.error(error)
            }

            var button = '<button type="button" class="btn btn-primary" onclick="ready()">Listo</button>'
                
            document.getElementById("addBtn2").innerHTML = button
            
        
        })
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