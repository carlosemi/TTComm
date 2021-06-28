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

function productWindow() {
  ipcRenderer.invoke('newWindow').then((result) => {
    console.log(result)
  })
}
