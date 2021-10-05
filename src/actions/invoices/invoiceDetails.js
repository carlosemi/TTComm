const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
const getToken = require('../../../config/token')
const $ = require('jquery')

var invoice = ipcRenderer.sendSync('invoiceInfo', '');
const ip = connectSRV();
const token = getToken();

// document.getElementById("Codigo").innerHTML = prd.sku;
// document.getElementById("Descripcion").value = prd.description;
// document.getElementById("Precio").value = prd.price;

console.log(invoice.id)

axios({
    method: 'get',
    url: `${ip}api/pos/tickets/${invoice.id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': token},
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


async function editPrd(sku){

    const ip = connectSRV();
    const token = getToken();

    var code = document.getElementById("Codigo").innerHTML;
    var descr = document.getElementById("Descripcion").value;
    var prc = document.getElementById("Precio").value;
    var tx = document.getElementById("Tax").checked;
    var exis = document.getElementById("Existencia").value;
    var wgh = document.getElementById("Weight").checked;

    console.log(code)
    console.log(descr)
    console.log(prc)
    console.log(tx)
    console.log(exis)
    console.log(wgh)

    await axios({
    method: 'post',
    url: `${ip}api/pos/addProduct`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': token},
    data: {
        sku: code,
        description: descr,
        price: prc,
        tax: tx,
        numOfItems: exis,
        weight: wgh
    }
    })
    .then(function (response){
        
        console.log(response.data)

        if(response.data==='Success'){
            
            document.getElementById("Success").textContent += `Success!!`

            //Wait 2 seconds before closing the window
            setTimeout(function () {
            // console.log("waited 3 seconds")
            ipcRenderer.invoke('closeEditWnd').then((result) => {
                
            })
            }, 2000)
            
        }
    })

}