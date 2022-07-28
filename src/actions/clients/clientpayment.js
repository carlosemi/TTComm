const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
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


//Get the information of the client based on the id given by the main process sent from the client.js
axios({
    method: 'get',
    url: `${ip}api/clients/client/${id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
 
})
.then(function (response){
    
    //console.log(response)

    id = response.data.id;
    name = response.data.name;
    plan = response.data.plan

    document.getElementById("clientId").innerHTML = response.data.id;
    document.getElementById("clientName").innerHTML = response.data.name;
    document.getElementById("plan").innerHTML = response.data.plan;
    document.getElementById("tax").innerHTML = (response.data.plan + (response.data.plan * 0.08));
    document.getElementById("paymentCash").min = response.data.plan
    document.getElementById("paymentCash").value = response.data.plan
    document.getElementById("location").innerHTML = response.data.location;

})

//Get the total amount of credit owed
axios({
    method: 'get',
    url: `${ip}api/clients/creditTotal/${id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
 
})
.then(function (response){
    
    //console.log(response)

    amountOwed = response.data

    document.getElementById("creditOwed").innerHTML = amountOwed;


})

const payment = async (paymentType) => {


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

        //console.log(cash)
        //console.log(monthPayment)

        //If cash is more or equal to the amount to pay, go with the transaction
        if(cash >= plan){

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

                //console.log("Response data: " + response.data)
                numOfTickets = response.data
                
                var total 
                if(document.getElementById('paymentTax').checked){
                    total = (parseInt(plan,10) + (parseInt(plan,10) * .08))
                }
                else{
                    total = parseInt(plan, 10)
                }

                console.log(total)

                //Increment the number of tickets
                numOfTickets = numOfTickets + 1

                //console.log(numOfTickets)

                //Save the client payment
                await axios({
                    method: 'post',
                    url: `${ip}api/clients/clientPayment/${id}`,
                    headers: {
                        'content-type': 'application/json',
                        'x-auth-token': localStorage.token
                    },
                    data: {
                        paymentMonth: monthPayment
                    }
                })
                .then(async function (response) {

                    if(response.data === "Success"){
                        //console.log("Updating client Success")
                    }


                })

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
                        total: total,
                        monthPayment: monthPayment,
                        paymentType: paymentType
                    }
                })
                .then(async function (response) {
        
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
                            },
                            {
                                type: 'text',
                                value: 'Cliente: ' + name,
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
                            {
                                type: 'text',
                                value: 'Total + IVA: $' + total,
                                style: 'font-size: 11px; color: black; margin-top:15px;margin-left: 48px; font-weight: bold;'
                            },
                            {
                                type: 'text',
                                value: 'Efectivo: $' + cash,
                                style: 'font-size: 11px; color: black; margin-top:15px;margin-left: 48px; font-weight: bold;'
                            },
                            {
                                type: 'text',
                                value: 'Cambio: $' + (cash - total),
                                style: 'font-size: 11px; color: black; margin-top:15px;margin-left: 48px; font-weight: bold;'
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
                        } catch (error) {
                            console.error(error)
                        }

                        var cashBack = cash - total
            
                        $("#cshBack").text("Cambio: " + cashBack.toFixed(2))
            
                        var button = '<button type="button" class="btn btn-primary" onclick="ready()">Listo</button>'
                        
                        document.getElementById("addBtn").innerHTML = button
                        
                    }  
                });
            });           

            
        }
    }

    
}

const creditPayment = async(paymentType) => {

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
                        'x-auth-token': localStorage.token},
            data: {
                payment: creditPayment
            }
         
        })
        .then(async function (response){
            
            //console.log(response)
        
        
            document.getElementById("Success2").textContent += `Success!!`

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
                    value: 'Cambio: $' + cashBack,
                    style: 'font-size: 11px; color: black; margin-top:15px;margin-left: 48px; font-weight: bold;'
                },
                {
                    type: 'text',
                    value: 'Gracias por su preferencia',
                    style: 'font-size: 10px; color: black; margin-top:200px'
                }
            ]

            //console.log(ticketData)

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