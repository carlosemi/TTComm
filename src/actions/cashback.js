const {ipcRenderer} = require('electron');
const axios = require('axios');
const $ = require('jquery')


var cashback = ipcRenderer.sendSync('cashbackAmount', '');

console.log(cashback.toFixed(2))

$("#cBack").text("$" + cashback.toFixed(2))


console.log($("#cBack").text())