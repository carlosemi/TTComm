// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const electron = require('electron');
const {ipcRenderer} = require('electron');
let $ = jQuery = require('jquery');


//This functions change the main component based on the menu button clicks
$(function(){
  $("#main").load("./src/components/ventas.html"); 
});


//Based on the click of the main buttons, it will change the div with id main to change screens and 
//load other html files
function vntFunction(){
$("#main").load("./src/components/ventas.html");
}

function prdFunction(){
$("#main").load("./src/components/productos.html");
}

function cliFunction(){
  $("#main").load("./src/components/clientes.html");
}

function fctFunction(){
  $("#main").load("./src/components/facturas.html");
}

function rptFunction(){
  $("#main").load("./src/components/reportes.html");
}

//This is for selecting the table row
$('#prd').on('click', 'tbody tr', function(event) {
  $(this).addClass('highlight').siblings().removeClass('highlight');
});

//Open new Window when Add Product is clicked
function productWindow() {
  ipcRenderer.invoke('newWindow').then((result) => {
    console.log(result)
  })
}

//Get the existing Products and put them in a table
async function getPrds() {

  // await axios({
  //   method: 'get',
  //   url: 'http://localhost:5000/api/pos/addProduct',
  //   headers: {'content-type': 'application/json' , 
  //               'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'},
  //   data: {
  //     sku: codigo,
  //     description: descripcion,
  //     price: precio,
  //     quantity: existencia
  //   }
  // })
  // .then(function (response){
  //   console.log(response.data)

  //   if(response.data==='Success'){
  //     document.getElementById("Success").textContent += `Success!!`

  //     //Wait 3 seconds before closing the window
  //     setTimeout(function () {
  //       // console.log("waited 3 seconds")
  //       ipcRenderer.invoke('closeWnd').then((result) => {
          
  //       })
  //     }, 3000)
     
      
  //   }
  // })
  
}



