
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
<<<<<<< HEAD
    //const token = getToken()
=======
    const token = getToken()
>>>>>>> master
  
    var table = document.getElementById('cli');
    var row;

    //First empty the Prds in the table. 
    //This is done so there are no repetition of items when you add a new item
    await $('#cliBdyId').empty()
  
    await axios({
      method: 'get',
      url: `${ip}api/clients`,
      headers: {
        'content-type': 'application/json',
<<<<<<< HEAD
        'x-auth-token': localStorage.token,
=======
        'x-auth-token': token,
>>>>>>> master
      }
    })
      .then(function (response) {

  
<<<<<<< HEAD
        var totalActive = 0

        const plan1 = 650
        var plan1ActiveTotal = 0
        
        const plan2 = 850
        var plan2ActiveTotal = 0

=======
>>>>>>> master
        var name, id, plan, location, monthPayment

        var icon = `<i class="far fa-times-circle"></i>`
  
        for (var x = 0; x < response.data.length; x++) {
        
          //Get todays date, more specifically year and month
            var date = new Date();
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();

            //today = mm + '/' + dd + '/' + yyyy;

            // console.log(response.data[x])

            name = response.data[x].name
            id = response.data[x].id
            plan = response.data[x].plan
            location = response.data[x].location
            monthPayment = response.data[x].monthPayment

            //If the day of the month is below the 20th check for the current month status
            if(dd < 20){

              date = yyyy + '-' + mm

              for(i in monthPayment){

                  //If there is a month payment with todays payment mark active as true
                  if(monthPayment[i] == date){
<<<<<<< HEAD
                    totalActive += 1
                    if(plan == plan1){
                      plan1ActiveTotal += 1
                    }
                    if(plan == plan2){
                      plan2ActiveTotal += 1
                    }

=======
>>>>>>> master
                    icon = `<i class="fas fa-check"></i>`
                  }
              }
            }
            //Else, if the day is past the 20th check for the next month status
            else{
<<<<<<< HEAD
              
              mm = parseInt(mm) + 1 
              // console.log("mm" + mm)

              //This is to add a trailing 0 if month is less than 10
              if(mm < 10){
                mm = '0' + mm
              }
=======

              mm = parseInt(mm) + 1 
              console.log("mm" + mm)
>>>>>>> master

              date = yyyy + '-' + mm

              for(i in monthPayment){

                  //If there is a month payment with todays payment mark active as true
                  if(monthPayment[i] == date){
<<<<<<< HEAD
                    totalActive += 1

                    if(plan == plan1){
                      plan1ActiveTotal += 1
                    }
                    if(plan == plan2){
                      plan2ActiveTotal += 1
                    }

=======
>>>>>>> master
                    icon = `<i class="fas fa-check"></i>`
                  }
              }
            }
<<<<<<< HEAD
=======
            

>>>>>>> master

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
            cell4.innerHTML = icon

            //Get the icon back to 'x'
            icon = `<i class="far fa-times-circle"></i>`
        }
<<<<<<< HEAD

        //console.log(plan1ActiveTotal, plan2ActiveTotal)
        $("#totalActive").text(totalActive)
        $("#plan1Active").text(plan1ActiveTotal)
        $("#plan2Active").text(plan2ActiveTotal)
=======
>>>>>>> master
  
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

//This function will send the id to the main process and the main process will
//send it to a new window. The new window will use it to do a GET request 
async function creditPurchase() {

  var lng = $("#cli")[0].rows.length - 1;

  //Var x starts in index 1 to not count the header
  for(var x = 1; x < lng + 1; x++){

    //When you find the table row with className "clickable-row active", get info from that row
    if($('#cli')[0].rows[x].className === "clickable-row active"){

      const data = {
        id: $("#cli")[0].rows[x].cells[0].innerHTML,
      }

      ipcRenderer.invoke('creditWindow', data).then((result) => {
        // console.log(result)
      })

      break
    }
  }

}


//Open new Window when Add Client is clicked, code to add product is in addPrd.js
var addClient = async() => {

  ipcRenderer.invoke('addClientWindow').then((result) => {
    // console.log(result)
  })

}


var editClient = async() => {

  var lng = $("#cli")[0].rows.length - 1;

  //Var x starts in index 1 to not count the header
  for(var x = 1; x < lng + 1; x++){

    // console.log($('#prd')[0].rows[x].value)

    //When you find the table row with className "clickable-row active", get info from that row
    if($('#cli')[0].rows[x].className === "clickable-row active"){

      // console.log("Sku: " + $("#prd")[0].rows[x].cells[0].innerHTML)
      // console.log("Description: " + $("#prd")[0].rows[x].cells[1].innerHTML)
      // console.log("Price: " + $("#prd")[0].rows[x].cells[2].innerHTML)
      // console.log("numOfItems: " + $("#prd")[0].rows[x].cells[3].innerHTML)

      const data = {
        id: $("#cli")[0].rows[x].cells[0].innerHTML,
        client: $("#cli")[0].rows[x].cells[1].innerHTML,
        plan: $("#cli")[0].rows[x].cells[2].innerHTML,
        location: $("#cli")[0].rows[x].cells[3].innerHTML,
        active: $("#cli")[0].rows[x].cells[4].innerHTML,
      }

      // console.log(data)

      //Open new Window when Edit client is clicked and send the product info
      ipcRenderer.invoke('editClientWindow', data).then((result) => {
        // console.log(result)
      })

      break
    }
    
  }
}


//Delete a client
var deleteCli = async() =>{

  const ip = connectSRV();
<<<<<<< HEAD
  //const token = getToken();
=======
  const token = getToken();
>>>>>>> master

  //X is rows.length - 1 because the head row is also counted
  var lng = $("#cli")[0].rows.length - 1;

  //Var x starts in index 1 to not count the header
  for(var x = 1; x < lng + 1; x++){

    // console.log($('#prd')[0].rows[x].value)

    //When you find the table row with className "clickable-row active", remove that row
    if($('#cli')[0].rows[x].className === "clickable-row active"){

      console.log("Row clicked: " + $("#cli")[0].rows[x].cells[0].innerHTML)

      await axios({
        method: 'delete',
        url: `${ip}api/clients`,
        headers: {
          'content-type': 'application/json',
<<<<<<< HEAD
          'x-auth-token': localStorage.token
=======
          'x-auth-token': token
>>>>>>> master
        },
        data: {
          id: $("#cli")[0].rows[x].cells[0].innerHTML
        },
      })
      .then(function (response) {
        console.log(response)
      })
    }
      
  }

  //Call the getPrds function again to display the updated table
  getCli()

}


var cliHistory = async() => {

  var lng = $("#cli")[0].rows.length - 1;

  //Var x starts in index 1 to not count the header
  for(var x = 1; x < lng + 1; x++){

    //When you find the table row with className "clickable-row active", get info from that row
    if($('#cli')[0].rows[x].className === "clickable-row active"){


      const data = {
        id: $("#cli")[0].rows[x].cells[0].innerHTML,
      }

      // console.log(data)

      //Open new Window when Edit client is clicked and send the product info
      ipcRenderer.invoke('cliHistoryWindow', data).then((result) => {
        // console.log(result)
      })

      break
    }
    
  }

}

var searchByName = async() => {

  var name = document.getElementById("src").value;

  const ip = connectSRV();
<<<<<<< HEAD
  //const token = getToken();
=======
  const token = getToken();
>>>>>>> master

  var table = document.getElementById('cli');
  var row;

  //First empty the Prds in the table. 
  //This is done so there are no repetition of items when you add a new item
  await $('#cliBdyId').empty()

  await axios({
    method: 'get',
    url: `${ip}api/clients/client/name/${name}`,
    headers: {
      'content-type': 'application/json',
<<<<<<< HEAD
      'x-auth-token': localStorage.token
=======
      'x-auth-token': token
>>>>>>> master
    }
  })
  .then(function (response) {

    var name, id, plan, location, monthPayment;

    name = response.data.name
    id = response.data.id
    plan = response.data.plan
    location = response.data.location
    monthPayment = response.data.monthPayment

    row =  table.getElementsByTagName('tbody')[0].insertRow(0)
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

  })

}


var searchById = async() => {

  var id = document.getElementById("src2").value;

  const ip = connectSRV();
<<<<<<< HEAD
  //const token = getToken();
=======
  const token = getToken();
>>>>>>> master

  var table = document.getElementById('cli');
  var row;

  console.log(id)
  //First empty the Prds in the table. 
  //This is done so there are no repetition of items when you add a new item
  await $('#cliBdyId').empty()

  await axios({
    method: 'get',
    url: `${ip}api/clients/client/${id}`,
    headers: {
      'content-type': 'application/json',
<<<<<<< HEAD
      'x-auth-token': localStorage.token
=======
      'x-auth-token': token
>>>>>>> master
    }
  })
  .then(function (response) {

    var name, id, plan, location, monthPayment;

    name = response.data.name
    id = response.data.id
    plan = response.data.plan
    location = response.data.location
    monthPayment = response.data.monthPayment

    row =  table.getElementsByTagName('tbody')[0].insertRow(0)
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

  })

}

//When there is a key press on the name search input, do a get call do a search
//based on the input
$("#src").keypress(async function() {

  var name = document.getElementById("src").value;

  const ip = connectSRV();
<<<<<<< HEAD
  //const token = getToken();
=======
  const token = getToken();
>>>>>>> master

  var table = document.getElementById('cli');
  var row;

  //First empty the Prds in the table. 
  //This is done so there are no repetition of items when you add a new item

  console.log(name)
  await $('#cliBdyId').empty()

  await axios({
    method: 'get',
    url: `${ip}api/clients/client/name/${name}`,
    headers: {
      'content-type': 'application/json',
<<<<<<< HEAD
      'x-auth-token': localStorage.token
=======
      'x-auth-token': token
>>>>>>> master
    }
  })
  .then(function (response) {

<<<<<<< HEAD

    var name, id, plan, location, monthPayment

    var icon = `<i class="far fa-times-circle"></i>`

    for (var x = 0; x < response.data.length; x++) {
    
      //Get todays date, more specifically year and month
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

=======
    var name, id, plan, location;

    console.log(response.data)

    if(response.data.length === 0){
      console.log("Nothing to search")
    }
    else{
      console.log(response.data)

      for(x in response.data){
>>>>>>> master
        name = response.data[x].name
        id = response.data[x].id
        plan = response.data[x].plan
        location = response.data[x].location
<<<<<<< HEAD
        monthPayment = response.data[x].monthPayment

        //If the day of the month is below the 20th check for the current month status
        if(dd < 20){

          date = yyyy + '-' + mm

          for(i in monthPayment){

              //If there is a month payment with todays payment mark active as true
              if(monthPayment[i] == date){
                icon = `<i class="fas fa-check"></i>`
              }
          }
        }
        //Else, if the day is past the 20th check for the next month status
        else{
          
          mm = parseInt(mm) + 1 
          console.log("mm" + mm)

          //This is to add a trailing 0 if month is less than 10
          if(mm < 10){
            mm = '0' + mm
          }

          console.log(mm)

          date = yyyy + '-' + mm

          for(i in monthPayment){

              console.log("IF " + monthPayment[i] + " === " + date)
              //If there is a month payment with todays payment mark active as true
              if(monthPayment[i] == date){
                icon = `<i class="fas fa-check"></i>`
              }
          }
        }
        
        row =  table.getElementsByTagName('tbody')[0].insertRow(x)
        row.className = "clickable-row"

=======

        //row = table.insertRow(x);
        row =  table.getElementsByTagName('tbody')[0].insertRow(x)
        row.className = "clickable-row"
    
>>>>>>> master
        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)
        var cell3 = row.insertCell(3)
<<<<<<< HEAD
        var cell4 = row.insertCell(4)


        cell0.innerHTML = id
        cell1.innerHTML = name
        cell2.innerHTML = plan
        cell3.innerHTML = location
        cell4.innerHTML = icon

        //Get the icon back to 'x'
        icon = `<i class="far fa-times-circle"></i>`
=======
    
        cell0.innerHTML = name
        cell1.innerHTML = id
        cell2.innerHTML = plan
        cell3.innerHTML = location

      }
      

>>>>>>> master
    }

  })
})