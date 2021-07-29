
//This changes the table row's class when clicked to change its background color to red to be deleted
$("#cli").on('click', '.clickable-row', function(event){

    if($(this).hasClass('active')){
        $(this).removeClass('active'); 
    } 
    else {
        $(this).addClass('active').siblings().removeClass('active');
    }

})


//Get the existing Clients and put them in a table
async function getCli () {

    const ip = connectSRV();
  
    var table = document.getElementById('cli');
    var row;

    //First empty the Prds in the table. 
    //This is done so there are no repetition of items when you add a new item
    $('#cliBdyId').empty()
  
    await axios({
      method: 'get',
      url: `${ip}api/clients`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
      }
    })
      .then(function (response) {
  
        var name, id, plan, location, monthPayment;
  
        for (var x = 0; x < response.data.length; x++) {
        

            // console.log(response.data[x])

            name = response.data[x].name
            id = response.data[x].id
            plan = response.data[x].plan
            location = response.data[x].location
            monthPayment = response.data[x].monthPayment

            // console.log(monthPayment)
            for(i in monthPayment){
                console.log(monthPayment[i])
            }
            console.log("-----")

            //row = table.insertRow(x);
            row =  table.getElementsByTagName('tbody')[0].insertRow(x)
            row.className = "clickable-row"

            var cell0 = row.insertCell(0)
            var cell1 = row.insertCell(1)
            var cell2 = row.insertCell(2)
            var cell3 = row.insertCell(3)
            var cell4 = row.insertCell(4)


            cell0.innerHTML = id
            cell1.innerHTML = name
            cell2.innerHTML = plan
            cell3.innerHTML = location
            cell4.innerHTML = "Activo"

        }
  
      })
    
}


//Make Payment function
//This function will send the id to the main process and the main process will
//send it to a new window. The new window will use it to do a GET request 
async function payment() {

  var lng = $("#cli")[0].rows.length - 1;

  //Var x starts in index 1 to not count the header
  for(var x = 1; x < lng + 1; x++){

    //When you find the table row with className "clickable-row active", get info from that row
    if($('#cli')[0].rows[x].className === "clickable-row active"){

      // console.log("Sku: " + $("#prd")[0].rows[x].cells[0].innerHTML)
      // console.log("Description: " + $("#prd")[0].rows[x].cells[1].innerHTML)
      // console.log("Price: " + $("#prd")[0].rows[x].cells[2].innerHTML)
      // console.log("numOfItems: " + $("#prd")[0].rows[x].cells[3].innerHTML)

      const data = {
        id: $("#cli")[0].rows[x].cells[0].innerHTML,
      }

      ipcRenderer.invoke('paymentWindow', data).then((result) => {
        // console.log(result)
      })

      break
    }
  }

  

}
