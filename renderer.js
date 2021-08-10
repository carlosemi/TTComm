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
const onScan = require('onscan.js')
const path = require('path')
const {PosPrinter} = require('electron').remote.require("electron-pos-printer");

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


//                           SCANNER FUNCTIONALITY

//This function detects scanner input 
onScan.attachTo(document, {
  suffixKeyCodes: [13], // enter-key expected at the end of a scan
  reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
  onScan: function(sCode, iQty) { // Alternative to document.addEventListener('scan')
      //console.log('Scanned: ' + iQty + 'x ' + sCode); 
      srcProduct(sCode)
  },
  // onKeyDetect: function(iKeyCode){ // output all potentially relevant key events - great for debugging!
  //     console.log('Pressed: ' + iKeyCode);
  // }
});