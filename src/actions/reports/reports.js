

var getMonthReport = async() => {

    const ip = connectSRV();
    const token = getToken();

    //Get the Brute Month Report
    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token
      }
    })
      .then(function (response) {
  
        var monthEarning = response.data

        console.log(monthEarning)

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
          'x-auth-token': token
        }
      })
        .then(function (response) {
    
          var netMonthEarning = response.data
  
          console.log(netMonthEarning)
  
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
          'x-auth-token': token
        }
      })
        .then(function (response) {
    
          var monthTaxes = response.data
  
          console.log(monthTaxes)
  
          //Format number with commas
          var iNum = new Intl.NumberFormat('en-US')
  
  
          $("#monthTaxes").text("$" + iNum.format(monthTaxes.toFixed(2)))
        })



}

var getYearReport = async() => {

    const ip = connectSRV();
    const token = getToken();

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/yearEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token
      }
    })
      .then(function (response) {
  
        var yearEarning = response.data

        console.log(yearEarning)

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
          'x-auth-token': token
        }
      })
        .then(function (response) {
    
          var netYearEarning = response.data
  
          console.log(netYearEarning)
  
          //Format number with commas
          var iNum = new Intl.NumberFormat('en-US')
  
  
          $("#netYearReport").text("$" + iNum.format(netYearEarning.toFixed(2)))
        })

}

var getDayReport = async() => {

    const ip = connectSRV();
    const token = getToken();

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/dayEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': token
      }
    })
      .then(function (response) {
  
        var dayEarning = response.data

        console.log(dayEarning)

        //Format number with commas
        var iNum = new Intl.NumberFormat('en-US')


        $("#dayReport").text("$" + iNum.format(dayEarning.toFixed(2)))
      })

}