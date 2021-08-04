const {ipcRenderer} = require('electron');
const axios = require('axios');
const $ = require('jquery')

var cashback = ipcRenderer.sendSync('cashbackAmount', '');
$("#cBack").text("$" + cashback.toFixed(2))


async function ready(){

    console.log("Ready clicked")
    ipcRenderer.invoke('closeCashBackWnd').then((result) => {
    
    })

}