

var getMonthReport = async() => {

    const ip = connectSRV();
    // const token = getToken();

    //Get the Brute Month Report
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var monthEarning = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#monthReport").text("$" + iNum.format(monthEarning.toFixed(2)))
    })

    //Get the Net Month Report
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/netMonthEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var netMonthEarning = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#netMonthReport").text("$" + iNum.format(netMonthEarning.toFixed(2)))
    })

    //Get the Net Month Taxes
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthTaxes`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var monthTaxes = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#monthTaxes").text("$" + iNum.format(monthTaxes.toFixed(2)))
    })

    //Get the Month Earning by Cash
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthEarningCash`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var monthEarningCash = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#monthCash").text("$" + iNum.format(monthEarningCash.toFixed(2)))
    })

    //Get the Month Earning by Debit
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthEarningDebit`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var monthEarningDebit = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#monthDebit").text("$" + iNum.format(monthEarningDebit.toFixed(2)))
    })

    //Get the Month Earning by Cash App
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthEarningCashApp`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var monthEarningCashApp = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#monthCashApp").text("$" + iNum.format(monthEarningCashApp.toFixed(2)))
    })

    //Get the Month Earning by Bank Transfer
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthEarningTransfer`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var monthEarningTransfer = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#monthTransfer").text("$" + iNum.format(monthEarningTransfer.toFixed(2)))
    })



}

var getYearReport = async() => {

    const ip = connectSRV();
    // const token = getToken();

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/yearEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var yearEarning = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#yearReport").text("$" + iNum.format(yearEarning.toFixed(2)))
    })

    //Get net year earning
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/netYearEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var netYearEarning = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#netYearReport").text("$" + iNum.format(netYearEarning.toFixed(2)))
    })

    //Get the Year Earning by Cash
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/yearEarningCash`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var yearEarningCash = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#yearEarningCash").text("$" + iNum.format(yearEarningCash.toFixed(2)))
    })

      //Get the Year Earning by Debit
      await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/yearEarningDebit`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var yearEarningDebit = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#yearEarningDebit").text("$" + iNum.format(yearEarningDebit.toFixed(2)))
    })

    //Get the Year Earning by Cash App
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/yearEarningCashApp`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var yearEarningCashApp = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#yearEarningCashApp").text("$" + iNum.format(yearEarningCashApp.toFixed(2)))
    })

    //Get the Year Earning by Transfer
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/yearEarningTransfer`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var yearEarningTransfer = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#yearEarningTransfer").text("$" + iNum.format(yearEarningTransfer.toFixed(2)))
    })
      
}

var getDayReport = async() => {

    const ip = connectSRV();
    // const token = getToken();

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/dayEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var dayEarning = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#dayReport").text("$" + iNum.format(dayEarning.toFixed(2)))
    })

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/dayEarningCash`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var dayEarningCash = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#dayEarningCash").text("$" + iNum.format(dayEarningCash.toFixed(2)))
    })

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/dayEarningDebit`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var dayEarningDebit = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#dayEarningDebit").text("$" + iNum.format(dayEarningDebit.toFixed(2)))
    })

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/dayEarningCashApp`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var dayEarningCashApp = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#dayEarningCashApp").text("$" + iNum.format(dayEarningCashApp.toFixed(2)))
    })

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/dayEarningTransfer`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {

      var dayEarningTransfer = response.data

      //Format number with commas
      var iNum = new Intl.NumberFormat('en-US')

      $("#dayEarningTransfer").text("$" + iNum.format(dayEarningTransfer.toFixed(2)))
    })

}


var getReportByDay = () => {

  var data = ""

  //Open new Window when Edit client is clicked and send the product info
  ipcRenderer.invoke('reportWindow', data).then((result) => {
    // console.log(result)
  })
}