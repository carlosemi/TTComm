//This changes the table row's class when clicked to change its background color to red to be deleted
$("#invoiceTbl").on('click', '.clickable-row', function(event){

    if($(this).hasClass('active')){
        $(this).removeClass('active'); 
    } 
    else {
        $(this).addClass('active').siblings().removeClass('active');
    }

})


//Get the existing Products and put them in a table
var getInvoices = async() => {

    const ip = connectSRV();
    //const token = getToken();

    var table = document.getElementById('invoiceTbl');
    var row;

    //First empty the Prds in the table. 
    //This is done so there are no repetition of items when you add a new item
    await $('#invoiceBdy').empty()
  
    await axios({
      method: 'get',
      url: `${ip}api/pos/tickets`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
      .then(function (response) {
  
        var id, client, products, tax, paymentType, total, date;
  
        var y = 0

        //Display the ticket from newest first to oldest
        for (var x = response.data.length - 1; x >= 0; x--) {

          // console.log(response.data[x])

          id = response.data[x].id
          client = response.data[x].client
          products = response.data[x].products
          tax = response.data[x].tax
          paymentType = response.data[x].paymentType
          total = response.data[x].total
          date = response.data[x].date
  
          //row = table.insertRow(x);
          row =  table.getElementsByTagName('tbody')[0].insertRow(y)
          row.className = "clickable-row"

  
          var cell0 = row.insertCell(0)
          var cell1 = row.insertCell(1)
          var cell2 = row.insertCell(2)
          var cell3 = row.insertCell(3)
          var cell4 = row.insertCell(4)

          var totalAndTax

          //If the tax is included added to the total so it does not give an error amount
          if(tax){
              totalAndTax = total + tax
          }
          else{
              totalAndTax = total
          }

          //This splits the date to not show milliseconds
          var b = date.split(".")

          cell0.innerHTML = id
          cell1.innerHTML = b[0]
          cell2.innerHTML = client
          
          if(paymentType == 1){
            cell3.innerHTML = "Efectivo"
          }
          else if(paymentType == 2){
            cell3.innerHTML = "Debito"
          }
          else if(paymentType == 3){
            cell3.innerHTML = "Cash App"
          }
          else if(paymentType == 4){
            cell3.innerHTML = "Transferencia"
          }
          cell4.innerHTML = totalAndTax.toFixed(2)

          y++
        }
  
      })
    
}

var invoiceDetail = async() => {

    var lng = $("#invoiceTbl")[0].rows.length - 1;

    //Var x starts in index 1 to not count the header
    for(var x = 1; x < lng + 1; x++){

        // console.log($('#prd')[0].rows[x].value)

        //When you find the table row with className "clickable-row active", get info from that row
        if($('#invoiceTbl')[0].rows[x].className === "clickable-row active"){

            const data = {
                id: $("#invoiceTbl")[0].rows[x].cells[0].innerHTML
            }

            //Open new Window when Edit Product is clicked and send the product info
            ipcRenderer.invoke('invoiceWindow', data).then((result) => {
                // console.log(result)
            })

            break
        }

    }

}

var getInvoicesByDate = async() => {

    const ip = connectSRV();
    //const token = getToken();

    var table = document.getElementById('invoiceTbl');
    var row;
    var searchDate = document.getElementById('searchDate').value

    // console.log(searchDate)

    //First empty the Prds in the table. 
    //This is done so there are no repetition of items when you add a new item
    await $('#invoiceBdy').empty()
  
    await axios({
      method: 'get',
      url: `${ip}api/pos/tickets`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
      .then(function (response) {
  
        var id, client, products, paymentType, tax, total, date;
        var y = 0;
  
        for (var x = 0; x < response.data.length; x++) {

            // console.log(response.data[x])

            id = response.data[x].id
            client = response.data[x].client
            products = response.data[x].products
            tax = response.data[x].tax
            paymentType = response.data[x].paymentType
            total = response.data[x].total
            date = response.data[x].date


            //This splits the date to not show time just date
            var c = date.split("T")
            console.log(c[0])

            if(c[0] === searchDate){

                console.log("True")
                //row = table.insertRow(x);
                row =  table.getElementsByTagName('tbody')[0].insertRow(y)
                row.className = "clickable-row"

                var cell0 = row.insertCell(0)
                var cell1 = row.insertCell(1)
                var cell2 = row.insertCell(2)
                var cell3 = row.insertCell(3)
                var cell4 = row.insertCell(4)

                var totalAndTax

                //If the tax is included added to the total so it does not give an error amount
                if(tax){
                    totalAndTax = total + tax
                }
                else{
                    totalAndTax = total
                }

                //This splits the date to not show milliseconds
                var b = date.split(".")

                cell0.innerHTML = id
                cell1.innerHTML = b[0]
                cell2.innerHTML = client
                if(paymentType == 1){
                  cell3.innerHTML = "Efectivo"
                }
                else if(paymentType == 2){
                  cell3.innerHTML = "Debito"
                }
                else if(paymentType == 3){
                  cell3.innerHTML = "Cash App"
                }
                else if(paymentType == 4){
                  cell3.innerHTML = "Transferencia"
                }
                cell4.innerHTML = totalAndTax.toFixed(2)
                
                y++
            }
          }
  
      })

}

var getInvoiceById = async() => {

    const ip = connectSRV();
    //const token = getToken();

    var table = document.getElementById('invoiceTbl');
    var row;
    var ticketId = document.getElementById('searchId').value

    // console.log(searchDate)

    //First empty the Prds in the table. 
    //This is done so there are no repetition of items when you add a new item
    await $('#invoiceBdy').empty()
  
    await axios({
      method: 'get',
      url: `${ip}api/pos/tickets/${ticketId}`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': localStorage.token
      }
    })
    .then(function (response) {
  
        var id, client, products, paymentType, tax, total, date;

        id = response.data.id
        client = response.data.client
        products = response.data.products
        tax = response.data.tax
        paymentType = response.data.paymentType
        total = response.data.total
        date = response.data.date

        //This splits the date to not show time just date
        var c = date.split("T")
        // console.log(c[0])


        console.log("True")
        //row = table.insertRow(x);
        row =  table.getElementsByTagName('tbody')[0].insertRow(0)
        row.className = "clickable-row"

        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)
        var cell3 = row.insertCell(3)
        var cell4 = row.insertCell(4)

        var totalAndTax

        //If the tax is included added to the total so it does not give an error amount
        if(tax){
            totalAndTax = total + tax
        }
        else{
            totalAndTax = total
        }

        //This splits the date to not show milliseconds
        var b = date.split(".")

        cell0.innerHTML = id
        cell1.innerHTML = b[0]
        cell2.innerHTML = client
        if(paymentType == 1){
          cell3.innerHTML = "Efectivo"
        }
        else if(paymentType == 2){
          cell3.innerHTML = "Debito"
        }
        else if(paymentType == 3){
          cell3.innerHTML = "Cash App"
        }
        else if(paymentType == 4){
          cell3.innerHTML = "Transferencia"
        }
        cell4.innerHTML = totalAndTax.toFixed(2)
            
  
    })

}