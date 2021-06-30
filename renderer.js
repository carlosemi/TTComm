// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const electron = require('electron');
const { ipcRenderer } = require('electron');
let $ = jQuery = require('jquery');
const axios = require('axios')

//This functions change the main component based on the menu button clicks
$(function () {
  $("#main").load("./src/components/ventas.html");
});


//Based on the click of the main buttons, it will change the div with id main to change screens and 
//load other html files
function vntFunction() {
  $("#main").load("./src/components/ventas.html");
}

function prdFunction() {
  $("#main").load("./src/components/productos.html");
}

function cliFunction() {
  $("#main").load("./src/components/clientes.html");
}

function fctFunction() {
  $("#main").load("./src/components/facturas.html");
}

function rptFunction() {
  $("#main").load("./src/components/reportes.html");
}


//Open new Window when Add Product is clicked
function productWindow() {
  ipcRenderer.invoke('newWindow').then((result) => {
    console.log(result)
  })
}

//Get the existing Products and put them in a table
async function getPrds() {

  var table = document.getElementById('prd');
  var row;

  await axios({
    method: 'get',
    url: 'http://localhost:5000/api/pos/getProducts',
    headers: {
      'content-type': 'application/json',
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
    }
  })
    .then(function (response) {

      console.log(response.data)
      console.log(response.data.length)
      console.log(response.data[0])

      var sku, description, price, quantity;

      for (var x = 0; x < response.data.length; x++) {
        sku = response.data[x].sku
        description = response.data[x].description
        price = response.data[x].price
        quantity = response.data[x].quantity

        row = table.insertRow(x + 1);
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)

        cell1.innerHTML = sku
        cell2.innerHTML = description
        cell3.innerHTML = price
        cell4.innerHTML = quantity
      }

    })

    //This is for selecting the table row
    $('#prd').on('click', 'tbody tr', function (event) {
      $(this).addClass('highlight').siblings().removeClass('highlight');
    });

}



