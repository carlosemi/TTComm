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


//This functions change the main component based on the menu button clicks
$(function () {
  $("#main").load("./src/components/sells.html");
});

function vntFunction() {
  $("#main").load("./src/components/sells.html");
}

function prdFunction() {
  $("#main").load("./src/components/products.html");
}

function cliFunction() {
  $("#main").load("./src/components/clients.html");
}

function fctFunction() {
  $("#main").load("./src/components/facturas.html");
}

function rptFunction() {
  $("#main").load("./src/components/reports.html");
}


