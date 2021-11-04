const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
//const getToken = require('../../../config/token')
const $ = require('jquery')


async function addCli() { 

  const ip = connectSRV();

  //const token = getToken();


  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var plan = document.getElementById("plan").value;
  var location = document.getElementById("location").value;

  console.log(id)
  console.log(name)
  console.log(plan)
  console.log(location)

  await axios({
    method: 'post',
    url: `${ip}api/clients`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': localStorage.token},
    data: {
      name: name,
      id: id,
      plan: plan,
      location: location
    }
  })
  .then(function (response){
    console.log(response.data)

    if(response.data==='Success'){
      document.getElementById("Success").textContent += `Success!!`

      //Wait 2 seconds before closing the window
      setTimeout(function () {
        // console.log("waited 3 seconds")
        ipcRenderer.invoke('closeCliWnd').then((result) => {
          
        })
      }, 2000)

    }

    else if( response.data == 0){

      document.getElementById("Error").textContent += `Error: Id ya existe!!`

      //Wait 2 seconds before closing the window
      setTimeout(function () {
        // console.log("waited 3 seconds")
        ipcRenderer.invoke('closeCliWnd').then((result) => {
          
        })
      }, 2000)
    }
  })

}