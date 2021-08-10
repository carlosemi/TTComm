// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const $ = require('jquery')
const {ipcHandeler} = require('electron')
const axios = require('axios')
const {ipcRenderer} = require('electron');
const {PosPrinter} = require('electron-pos-printer');
const fs = require('fs')
//const printer = require('printer')

var reply

function createWindow () {
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

  //console.log(mainWindow.webContents.getPrinters())

  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  reply = async () => {

    console.log("reply called")
    await mainWindow.webContents.send('asynchronous-message', {'SAVED': 'File Saved'});
  
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
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//----------------------------------------------------------------------------------------------------
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

let paymentWindow
let id

//Open new window to make payment
ipcMain.handle('paymentWindow', async (event, data) => {

  paymentWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
      enableRemoteModule: true,
    },
  
  })

  console.log(data.id)

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

  console.log(data)

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



//                    PRINTER


let win

ipcMain.on('print', (event, arg) => {

  // win = new BrowserWindow({ 
  //   width: 302,
  //   height: 793, 
  //   show: false,
  //   webPreferences: {
  //     nodeIntegration: true, 
  //     contextIsolation: false,
  //     enableRemoteModule: true,
  //   },
  
  // });

  // win.loadFile('./src/components/print.html');

  // let printer = 'Terow'

  // const options = {
  //     silent: true,
  //     deviceName: printer,
  //     pageSize: { height: 5000, width: 50000 }
  // }

  // //Print 
  // win.webContents.print(options, () => {
  //     //win = null;
  //     // win.close()
  //     console.log(options)

  // });

  var info = fs.readFileSync('ticket.txt').toString();

  function sendPrint() {
    printer.printDirect({
      printer: 'Terow',
      data: info,
      type: 'RAW',
      success: function (jobID) {
        console.log("ID: " + jobID);
      },
      error: function (err) {
        console.log('printer module error: '+err);
        throw err;
      }
    });
  }

  sendPrint()

});

