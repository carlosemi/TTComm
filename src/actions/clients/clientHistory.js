const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
//const getToken = require('../../../config/token')
const $ = require('jquery')

const ip = connectSRV();
//const token = getToken();

var obj = ipcRenderer.sendSync('clientInfo2', '');

//console.log(obj.id)

const today = new Date()
const year = today.getFullYear()//Get Current Year
const month = today.getMonth() //Get Current Month

document.getElementById("Year").innerHTML = year

//console.log(month)

var id, name, plan, location


//Get the information of the client based on the id given by the main process sent from the client.js
axios({
    method: 'get',
    url: `${ip}api/clients/client/${obj.id}`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
 
})
.then(function (response){
    
    //console.log(response)

    id = response.data.id;
    name = response.data.name;
    plan = response.data.plan
    //location = response.data.location
    monthpayments = response.data.monthPayment

    var creditStatements = response.data.credit

    //console.log("monthpayments: " + monthpayments)
    //console.log(response.data.location)

    document.getElementById("clientId").innerHTML = response.data.id;
    document.getElementById("clientName").innerHTML = response.data.name;
    document.getElementById("plan").innerHTML = response.data.plan;
    document.getElementById("location").innerHTML = response.data.location
    document.getElementById("phone").innerHTML = response.data.phoneNumber
    document.getElementById("creditOwed").innerHTML = "$" + response.data.creditOwed
    //document.getElementById("location").innerHTML = response.data.location;

    //console.log(creditStatements)


    var description, cost
    var table = document.getElementById('cliCredit');
    var row;

  
    for (x in creditStatements) {

        description = creditStatements[x].description
        cost = creditStatements[x].amount

        //row = table.insertRow(x);
        row =  table.getElementsByTagName('tbody')[0].insertRow(x)
        row.className = "clickable-row"

        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)


        cell0.innerHTML = description
        cell1.innerHTML = cost

    }

    
    for(x in monthpayments){

        var arr = monthpayments[x].split("-")

        if(parseInt(arr[0]) === year){

            if(arr[1] != "" && arr[1] != null){
    
                // console.log(arr[0])
                // console.log(arr[1])

                if(arr[1] === "01"){
                    var element = document.getElementById("jan")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "02"){
                    var element = document.getElementById("feb")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "03"){
                    var element = document.getElementById("mar")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "04"){
                    var element = document.getElementById("apr")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "05"){
                    var element = document.getElementById("may")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "06"){
                    var element = document.getElementById("jun")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "07"){
                    var element = document.getElementById("jul")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "08"){
                    var element = document.getElementById("aug")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "09"){
                    var element = document.getElementById("sep")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "10"){
                    var element = document.getElementById("oct")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "11"){
                    var element = document.getElementById("nov")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "12"){
                    var element = document.getElementById("dec")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
            }
        }
    }
    
})

var classEdit = async() => {

    var element = document.getElementById("jan")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("feb")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("mar")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }
        
    element = document.getElementById("apr")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("may")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("jun")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("jul")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("aug")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }
    
    element = document.getElementById("sep")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("oct")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("nov")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }

    element = document.getElementById("dec")

    if(element.classList.contains("bg-success")){
        element.classList.remove("bg-success")
        element.classList.add("bg-danger")
    }
}

var left = async() => {

    //Initially add class 'bg-danger' to all month elements to appear red
    classEdit()

    var y = document.getElementById("Year").innerHTML
    var y = parseInt(y) - 1
    document.getElementById("Year").innerHTML = y 

    for(x in monthpayments){

        var arr = monthpayments[x].split("-")

        if(parseInt(arr[0]) === y){

            if(arr[1] != "" && arr[1] != null){
    
                // console.log(arr[0])
                // console.log(arr[1])

                if(arr[1] === "01"){
                    var element = document.getElementById("jan")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "02"){
                    var element = document.getElementById("feb")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "03"){
                    var element = document.getElementById("mar")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "04"){
                    console.log("True 04")
                    var element = document.getElementById("apr")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "05"){
                    var element = document.getElementById("may")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "06"){
                    var element = document.getElementById("jun")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "07"){
                    var element = document.getElementById("jul")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "08"){
                    var element = document.getElementById("aug")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "09"){
                    var element = document.getElementById("sep")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "10"){
                    var element = document.getElementById("oct")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "11"){
                    var element = document.getElementById("nov")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "12"){
                    var element = document.getElementById("dec")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
            }
        }
    }
}

var right = async() => {

    classEdit()

    var y = document.getElementById("Year").innerHTML
    var y = parseInt(y) + 1
    document.getElementById("Year").innerHTML = y 


    for(x in monthpayments){

        var arr = monthpayments[x].split("-")

        if(parseInt(arr[0]) === y){

            if(arr[1] != "" && arr[1] != null){
    
                // console.log(arr[0])
                // console.log(arr[1])

                if(arr[1] === "01"){
                    var element = document.getElementById("jan")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "02"){
                    var element = document.getElementById("feb")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "03"){
                    var element = document.getElementById("mar")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "04"){
                    console.log("True 04")
                    var element = document.getElementById("apr")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "05"){
                    var element = document.getElementById("may")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "06"){
                    var element = document.getElementById("jun")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "07"){
                    var element = document.getElementById("jul")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "08"){
                    var element = document.getElementById("aug")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "09"){
                    var element = document.getElementById("sep")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "10"){
                    var element = document.getElementById("oct")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "11"){
                    var element = document.getElementById("nov")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
                if(arr[1] === "12"){
                    var element = document.getElementById("dec")
                    element.classList.remove("bg-danger")
                    element.classList.add("bg-success")
                }
            }
        }
    }
}


const ready = async () => {
   
    //Wait 2 seconds before closing the window
    setTimeout(function () {
        // console.log("waited 3 seconds")
        ipcRenderer.invoke('closeCliPaymentWnd').then((result) => {
            
    })
    }, 2000)

}