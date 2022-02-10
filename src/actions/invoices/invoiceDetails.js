const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
//const getToken = require('../../../config/token')
const $ = require('jquery');
const { dirname } = require('path');

var invoice = ipcRenderer.sendSync('invoiceInfo', '');
const ip = connectSRV();
//const token = getToken();

// document.getElementById("Codigo").innerHTML = prd.sku;
// document.getElementById("Descripcion").value = prd.description;
// document.getElementById("Precio").value = prd.price;

console.log(invoice.id)

axios({
    method: 'get',
    url: `${ip}api/pos/tickets/${invoice.id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
}) 
.then(function (response){
    
    console.log(response.data)


    document.getElementById("id").innerHTML = response.data.id
    //If a client exists print it 
    if(response.data.client){
        document.getElementById("client").innerHTML = response.data.client
    }
    else{
        document.getElementById("client").innerHTML = "N/A"
    }

    if(response.data.monthPayment){
        document.getElementById("monthPayment").innerHTML = response.data.monthPayment
    }
    else{
        document.getElementById("monthPayment").innerHTML = "N/A"
    }


    if(response.data.products){
        for(x in response.data.products){
            document.getElementById("products").innerHTML += `<label> ${response.data.products[x]}</label> <br>`
        }
    }
    else{
        document.getElementById("products").innerHTML = "N/A"
    }

    if(response.data.tax){
        document.getElementById("tax").innerHTML = response.data.tax
        document.getElementById("totalAndTaxes").innerHTML = response.data.tax + response.data.total
    }
    else{
        document.getElementById("tax").innerHTML = "N/A"
        document.getElementById("totalAndTaxes").innerHTML = response.data.total
    }

    document.getElementById("total").innerHTML = response.data.total

    if(response.data.paymentType){

        var payType

        if(response.data.paymentType == 1){
            payType = "Efectivo"
        }
        else if(response.data.paymentType == 2){
            payType = "Debito"
        }
        else if(response.data.paymentType == 3){
            payType = "Cash App"
        }
        else if(response.data.paymentType == 4){
            payType = "Transferencia de Banco"
        }

        document.getElementById("paymentType").innerHTML = payType
    }
    
    document.getElementById("date").innerHTML = response.data.date


    // if(response.data==='Success'){
        
    //     document.getElementById("Success").textContent += `Success!!`

    //     //Wait 2 seconds before closing the window
    //     setTimeout(function () {
    //     // console.log("waited 3 seconds")
    //     ipcRenderer.invoke('closeInvoiceWnd').then((result) => {
            
    //     })
    //     }, 2000)
        
    // }
})


var print = async () => {

    const path = require("path");

    console.log( path.join(__dirname, '../../../img/ttcomm.png'))

    var today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth()+1)+'-'+today.getDate();
    var name = $("#client").text()
    var monthPayment = $("#monthPayment").text()
    var plan = $("#total").text()
    var id = $("#id").text()

    var clientId

     //Get the clients id
     await axios({
        method: 'get',
        url: `${ip}api/clients/client/name2/${name}`,
        headers: {'content-type': 'application/json' , 
                    'x-auth-token': localStorage.token},
    })
    .then(function (response){

        console.log(response.data)
        clientId = response.data.id
        console.log(clientId)
    })

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
            value: 'Cambio: $',
            style: 'font-size: 11px; color: black; margin-top:15px;margin-left: 63px; font-weight: bold;'
        },
        {
            type: 'qrCode',
             value: 'Ticket Id: ' + id + '\n' + 'Id de Cliente: ' + clientId,
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

    console.log(ticketData)

    try {
        await ipcRenderer.send('print', ticketData)
    } catch (error) {
        console.error(error)
    }
}