const electron = require('electron')
const {ipcRenderer} = require('electron');
let $ = jQuery = require('jquery');
const {remote} = require('electron')
const {BrowserWindow} = remote;

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

  // const remote = require('electron').remote
  // const BrowserWindow = remote.BrowserWindow

  // Create a pop up window.
  const prdWindow = new BrowserWindow({
  width: 100,
  height: 600,
  webPreferences: {
    enableRemoteModule: true
  }
  });
}


// //Open pop up window for adding, Editing or Erasing Product
// function productWindow () {

//    // Create a pop up window.
//    const productWindow = new BrowserWindow({
//     width: 100,
//     height: 600,
//     webPreferences: {
//       //preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true,
//       contextIsolation: false
//     }

//   })

//   productWindow.maximize()

//   // and load the productPop.html of the app.
//   productWindow.loadFile('./src/components/productPop.html')
// }