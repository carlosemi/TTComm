const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
//const getToken = require('../../../config/token')
const $ = require('jquery')

const ip = connectSRV();
//const token = getToken();


var generateReport = async () => {

    var date = $("#date").val()

    await axios({
        method: 'post',
        url: `${ip}api/pos/getInvoice/dayReport`,
        headers: {'content-type': 'application/json' , 
                    'x-auth-token': localStorage.token
        },
        data: {
            date: date
        }
    })
    .then(function (response){
        

        //Format number with commas
        var iNum = new Intl.NumberFormat('en-US')

        var total = response.data.total
        total = iNum.format(total.toFixed(2))
        $("#totalEarning").text(total)

        var totalCash = response.data.totalCash
        totalCash = iNum.format(totalCash.toFixed(2))
        $("#cashEarning").text(totalCash)

        var totalDebit = response.data.totalDebit
        totalDebit = iNum.format(totalDebit.toFixed(2))
        $("#debitEarning").text(totalDebit)

        var totalCashApp = response.data.totalCashApp
        totalCashApp = iNum.format(totalCashApp.toFixed(2))
        $("#cashAppEarning").text(totalCashApp)

        var totalTransfer = response.data.totalTransfer
        totalTransfer = iNum.format(totalTransfer.toFixed(2))
        $("#transferEarning").text(totalTransfer)
    })
}