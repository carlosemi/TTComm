const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../../config/srv')
const $ = require('jquery')

console.log('Current directory: ' + process.cwd());

async function addCli() { 

  const ip = connectSRV();

  console.log('addCli This')

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
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'},
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
  })

}