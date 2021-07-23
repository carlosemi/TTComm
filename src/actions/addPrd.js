const {ipcRenderer} = require('electron');
const axios = require('axios');
const connectSRV = require('../../config/srv')

async function addPrd() { 

  const ip = connectSRV();

  console.log('addPrdcall This')

  var code = document.getElementById("Codigo").value;
  var descr = document.getElementById("Descripcion").value;
  var prc = document.getElementById("Precio").value;
  var tx = document.getElementById("Tax").checked;
  var exis = document.getElementById("Existencia").value;
  var wgh = document.getElementById("Weight").checked;

  console.log(code)
  console.log(descr)
  console.log(prc)
  console.log(tx)
  console.log(exis)
  console.log(wgh)

  await axios({
    method: 'post',
    url: `${ip}api/pos/addProduct`,
    headers: {'content-type': 'application/json' , 
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'},
    data: {
      sku: code,
      description: descr,
      price: prc,
      tax: tx,
      numOfItems: exis,
      weight: wgh
    }
  })
  .then(function (response){
    console.log(response.data)

    // if(response.data==='Success'){
    //   document.getElementById("Success").textContent += `Success!!`

    //   //Wait 3 seconds before closing the window
    //   setTimeout(function () {
    //     // console.log("waited 3 seconds")
    //     ipcRenderer.invoke('closeWnd').then((result) => {
          
    //     })
    //   }, 3000)
     
      
    // }
  })
  
}
