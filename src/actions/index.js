const {ipcRenderer} = require('electron');
const axios = require('axios')

function addPrd() { 

  console.log('addPrdcall This')

  var codigo = document.getElementById("Codigo").value;
  var descripcion = document.getElementById("Descripcion").value;
  var precio = document.getElementById("Precio").value;
  var existencia = document.getElementById("Existencia").value;

  console.log(codigo)
  console.log(descripcion)
  console.log(precio)
  console.log(existencia)

  axios({
    method: 'post',
    url: 'http://localhost:5000/api/pos/addProduct',
    headers: {'content-type': 'application/json' , 
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'},
    data: {
      sku: codigo,
      description: descripcion,
      price: precio,
      quantity: existencia
    }
  });

  console.log("Call success")
}
