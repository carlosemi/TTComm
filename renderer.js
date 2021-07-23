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
const fs = require('fs')

//Connect to the server
const connectSRV = require('./config/srv')

//Global List of the cart
var cartList = new Array;


//This functions change the main component based on the menu button clicks
$(function () {
  $("#main").load("./src/components/ventas.html");
});

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

