const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')

console.log("In the Edit Store")


//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

var prd = ipcRenderer.sendSync('synchronous-message', '');

document.getElementById("Codigo").innerHTML = prd.sku;
document.getElementById("Descripcion").value = prd.description;
document.getElementById("Precio").value = prd.price;

console.log(prd.tax)
document.getElementById("Tax").checked = prd.tax;
document.getElementById("Existencia").value = prd.numOfItems
document.getElementById("Weight").checked = prd.weight


async function editPrd(sku){

    const ip = connectSRV();

}