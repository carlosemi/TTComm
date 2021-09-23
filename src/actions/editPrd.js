const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
const $ = require('jquery')

var prd = ipcRenderer.sendSync('synchronous-message', '');

console.log(prd.numOfItems)

document.getElementById("Codigo").innerHTML = prd.sku;
document.getElementById("Descripcion").value = prd.description;
document.getElementById("Precio").value = prd.price;
document.getElementById("Cost").value = prd.cost
document.getElementById("Existance").value = prd.numOfItems

if(prd.tax === "true"){
    $("#Tax").prop("checked", true)
}
else{
    $("#Tax").prop("checked", 0)
}



if(prd.weight === "true"){
    $("#Weight").prop("checked", true)
}
else{
    $("#Weight").prop("checked", 0)
}


async function editPrd(sku){

    const ip = connectSRV();

    var code = document.getElementById("Codigo").innerHTML;
    var descr = document.getElementById("Descripcion").value;
    var prc = document.getElementById("Precio").value;
    var cst = document.getElementById("Cost").value;
    var tx = document.getElementById("Tax").checked;
    var exis = document.getElementById("Existance").value;
    var wgh = document.getElementById("Weight").checked;

    console.log(code)
    console.log(descr)
    console.log(prc)
    console.log(cst)
    console.log(tx)
    console.log(exis)
    console.log(wgh)

    await axios({
    method: 'post',
    url: `${ip}api/pos/addProduct`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'},
    data: {
        sku: code,
        description: descr,
        price: prc,
        cost: cst,
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