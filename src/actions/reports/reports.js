

var getMonthReport = async() => {

    const ip = connectSRV();

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/monthEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
      }
    })
      .then(function (response) {
  
        var monthEarning = response.data

        console.log(monthEarning)

        //Format number with commas
        var iNum = new Intl.NumberFormat('en-US')


        $("#monthReport").text("$" + iNum.format(monthEarning.toFixed(2)))
      })

}

var getYearReport = async() => {

    const ip = connectSRV();

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/yearEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
      }
    })
      .then(function (response) {
  
        var yearEarning = response.data

        console.log(yearEarning)

        //Format number with commas
        var iNum = new Intl.NumberFormat('en-US')


        $("#yearReport").text("$" + iNum.format(yearEarning.toFixed(2)))
      })

}

var getDayReport = async() => {

    const ip = connectSRV();

    await axios({
      method: 'get',
      url: `${ip}api/pos/getInvoice/dayEarning`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
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