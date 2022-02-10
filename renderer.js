// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const electron = require('electron');
const { ipcRenderer, ipcMain } = require('electron');
let $ = jQuery = require('jquery');
const axios = require('axios')
const fs = require('fs')
const onScan = require('onscan.js')
const path = require('path')
const {PosPrinter} = require('electron').remote.require("electron-pos-printer");

//Login
//import setAuthToken from '../utils/setAuthToken';
const setAuthToken = require('./src/utils/setAuthToken')
var isAuthenticated = false

//Once user is authenticated it will get it's properties
var user

const roles = {
  ADMIN: "ADMIN",
  REGULAR: "REGULAR",
};


//When the program starts make sure the token is null
ipcRenderer.on('tok', async (event, arg) => {

  localStorage.token = null

})


const authenticate = async () => {
  console.log("Authenticated")
  isAuthenticated = true

  console.log(localStorage.token)
  $("#user").text(user.name)
}

async function printTicket() {

  ipcRenderer.sendSync('print', '')
}

//Connect to the server
const connectSRV = require('./config/srv')

//Get the authorized token for the user to make API calls
//const getToken = require('./config/token')

//This functions change the main component based on the menu button clicks
$(function () {
  $("#main").load("./src/components/login/login.html");
});


function vntFunction() {
  if(isAuthenticated){
    $("#main").load("./src/components/sells.html")
  }
  
}

function prdFunction() {
  if(isAuthenticated){
    $("#main").load("./src/components/products.html");
  }
 
}

function cliFunction() {
  if(isAuthenticated){
    $("#main").load("./src/components/clients.html");
  }
}

function fctFunction() {
  if(isAuthenticated){
    $("#main").load("./src/components//invoices/invoices.html");
  }
}

function rptFunction() {
  if(isAuthenticated && user.userType == 1){
    $("#main").load("./src/components/reports.html");
  }
}

function confFunction() {
  if(isAuthenticated){
    $("#main").load("./src/components/config/config.html")
  }
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


//When the edit product or add product window is closed update the products table, this
//comes from the main process
ipcRenderer.on('reply2', function (evt, message) {
  //console.log(message); // Returns: {'SAVED': 'File Saved'}
  getCli()
});


//When the edit product or add product window is closed update the products table, this
//comes from the main process
ipcRenderer.on('asynchronous-message', function (evt, message) {
  //console.log(message); // Returns: {'SAVED': 'File Saved'}
  getPrds()
});


//                                      PRINT

const printT = async (ticketData) => {
    await ipcRenderer.send('print', ticketData)
}


module.exports = printT, authenticate, cliFunction
