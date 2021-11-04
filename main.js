// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const $ = require('jquery')
const {ipcHandeler} = require('electron')
const axios = require('axios')
const {ipcRenderer} = require('electron');
const {PosPrinter} = require('electron-pos-printer');
const fs = require('fs')
const { EventEmitter } = require('stream')

app.commandLine.appendSwitch('ignore-certificate-errors')
//app.commandLine.appendSwitch('allow-insecure-localhost', 'true')

//Printer
const escpos = require('escpos');
//const { printFile } = require('printer')

var reply
var reply2

async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 100,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  //Print out in the console the printers available
  // console.log(mainWindow.webContents.getPrinters())

  await mainWindow.maximize()

  // and load the index.html of the app.
  await mainWindow.loadFile('index.html')
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  await mainWindow.webContents.send('tok', 'done');
  

  //This reply is to call the function getPrds() on the renderer to automatically update the table
  //after a change has been made
  reply = async () => {

    //console.log("reply called")
    await mainWindow.webContents.send('asynchronous-message', {'SAVED': 'File Saved'});
  
  }

  //This reply is to call the function getCli() on the renderer to automatically update the table
  //after a change has been made
  reply2 = async () => {

    await mainWindow.webContents.send('reply2', {'SAVED': 'File Saved'});
  }

  

  // printWindow()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()

  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async function () {

  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.setMaxListeners(20)
//------------------------------------------------------------------------------------------------
//                                 CASH BACK WINDOW

let cashbackWindow
let cashback

//Open new window to make payment
ipcMain.handle('cashbackWindow', async (event, data) => {

  cashbackWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  //console.log(data)

  cashback = data

  // and load the index.html of the app.
  await cashbackWindow.loadFile('./src/components/cashback.html')  

})


//Send the id to the client payment window
ipcMain.on('cashbackAmount', async (event, arg) => {
  //console.log(arg) // prints "ping"
  event.returnValue = cashback
})

//Close the cashback window when ready button is clicked
ipcMain.handle('closeCashBackWnd', async (event) =>{

  await cashbackWindow.close()
})

//----------------------------------------------------------------------------------------------------
//                                    ADD PRODUCT WINDOW
let popWindow

//Open new window to add product
ipcMain.handle('newWindow', async (event) => {

  popWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  // and load the index.html of the app.
  popWindow.loadFile('./src/components/products/addPrd.html')
})

//Close the add product window when add product button is clicked
ipcMain.handle('closeWnd', async (event) =>{
  //The reply is to send back to the renderer process to update the table 
  await reply()
  await popWindow.close()
})

//------------------------------------------------------------------------------------------------------
//                                     PRODUCT EDIT WINDOW
let editWindow
let obj

//Open new window to edit product
ipcMain.handle('editWindow', async (event, data) => {

  editWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  // console.log(data)

  obj = data
  // and load the index.html of the app.
  editWindow.loadFile('./src/components/products/editPrd.html')  
  
})

//Send the object to be edited to the edit window
ipcMain.on('synchronous-message', (event, arg) => {
  //console.log(arg) // prints "ping"
  event.returnValue = obj
})


//Close the edit product window when edit product button is clicked
ipcMain.handle('closeEditWnd', async (event) =>{

  await reply()
  await editWindow.close()
})

//---------------------------------------------------------------------------------------------------
//                                  CLIENT PAYMENT WINDOW
let paymentWindow
let id

//Open new window to make payment
ipcMain.handle('paymentWindow', async (event, data) => {

  paymentWindow = new BrowserWindow({
    width: 500,
    height: 900,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  //console.log(data.id)

  id = data.id

  // and load the index.html of the app.
  await paymentWindow.loadFile('./src/components/clients/clientpayment.html')  

})


//Send the id to the client payment window
ipcMain.on('paymentId', (event, arg) => {
  //console.log(arg) // prints "ping"
  event.returnValue = id
})

//Close the cashback window when ready button is clicked
ipcMain.handle('closeCliPaymentWnd', async (event) =>{

  await paymentWindow.close()
})

//---------------------------------------------------------------------------------------------------
//                                  CLIENT CREDIT WINDOW
let creditWindow

//Open new window to make payment
ipcMain.handle('creditWindow', async (event, data) => {

  creditWindow = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  //console.log(data.id)

  id = data.id

  // and load the index.html of the app.
  await creditWindow.loadFile('./src/components/clients/clientcredit.html')  

})


//Send the id to the client payment window
ipcMain.on('creditId', (event, arg) => {
  //console.log(arg) // prints "ping"
  event.returnValue = id
})

//Close the cashback window when ready button is clicked
ipcMain.handle('closeCliCreditWnd', async (event) =>{

  await creditWindow.close()
})

//-------------------------------------------------------------------------------------
//                               ADD CLIENT WINDOW
let addCliWindow

//Open new window to add product
ipcMain.handle('addClientWindow', async (event) => {

  addCliWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  // and load the index.html of the app.
  addCliWindow.loadFile('./src/components/clients/addClient.html')
})

//Close the add product window when add product button is clicked
ipcMain.handle('closeCliWnd', async (event) =>{

  //The reply is to send back to the renderer process to update the table 
  await reply2()
  await addCliWindow.close()

})
//------------------------------------------------------------------------------------
//                               EDIT CLIENT WINDOW
let editClientWindow
let cliObj

//Open new window to edit product
ipcMain.handle('editClientWindow', async (event, data) => {

  editClientWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  // console.log(data)

  cliObj = data
  // and load the index.html of the app.
  editClientWindow.loadFile('./src/components/clients/editClient.html')  
  
})

//Send the object to be edited to the edit window
ipcMain.on('clientInfo', (event, arg) => {
  //console.log(arg) // prints "ping"
  event.returnValue = cliObj
})


//Close the edit client window when edit client button is clicked
ipcMain.handle('closeClientEditWnd', async (event) =>{

  await reply2()
  await editClientWindow.close()
})
//------------------------------------------------------------------------------------
//                            INVOICE DETAIL WINDOW
let invoiceWindow
let invoiceObj

//Open new window to edit product
ipcMain.handle('invoiceWindow', async (event, data) => {

  invoiceWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  invoiceObj = data
  // and load the index.html of the app.
  invoiceWindow.loadFile('./src/components/invoices/invoiceDetails.html')  
  
})

//Send the object to be edited to the edit window
ipcMain.on('invoiceInfo', (event, arg) => {

  event.returnValue = invoiceObj
})


//Close the edit client window when edit client button is clicked
ipcMain.handle('closeInvoiceWnd', async (event) =>{

  await invoiceWindow.close()
})


//------------------------------------------------------------------------------------
//                           CLIENT PAYMENT HISTORY
let cliHistoryWindow
let cliObj2

//Open new window to edit product
ipcMain.handle('cliHistoryWindow', async (event, data) => {

  cliHistoryWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  // console.log(data)

  cliObj2 = data
  // and load the index.html of the app.
  cliHistoryWindow.loadFile('./src/components/clients/clientHistory.html')  
  
})

//Send the object to be edited to the edit window
ipcMain.on('clientInfo2', (event, arg) => {
  //console.log(arg) // prints "ping"
  event.returnValue = cliObj2
})


//Close the edit client window when edit client button is clicked
ipcMain.handle('closeHistoryWnd', async (event) =>{

  await reply2()
  await cliHistoryWindow.close()
})



//-------------------------------------------------------------------------------------
//                               THERMAL PRINTER
let win

ipcMain.on('print', async (event, data) => {
  
  if(data){

    //console.log(data)
    await PosPrinter.print(data, {
      printerName: 'POS-58',
      silent: true,
      preview: false,
      copies: 2,
      width: '170px',
      margin: '0 0 0 0',
    })
    .catch(error => console.error(error))
  }

});

//------------------------------------------------------------------------------------
