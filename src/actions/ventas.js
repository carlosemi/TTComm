
//Global List of the cart
var cart = new Array;

async function srcProdcut() {


}


//Search and add Product to the cart
async function srcProduct() { 

    const ip = connectSRV();

    //console.log(document.getElementById('srcPrd').value)

    sku = document.getElementById('srcPrd').value;
    var table = document.getElementById('vnt');
    var row;

    await axios({
        method: 'get',
        url: `${ip}api/pos/getProduct/${sku}`,
        headers: {
            'content-type': 'application/json',
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
        }
      })
        .then(function (response) {

            console.log(response.data)
            cart.push(response.data)


            var sku, description, price, quantity;

            sku = response.data.sku
            description = response.data.description
            price = response.data.price
            quanityt = response.data.quantity

            row =  table.getElementsByTagName('tbody')[0].insertRow()
            var cell0 = row.insertCell(0)
            var cell1 = row.insertCell(1)
            var cell2 = row.insertCell(2)
            var cell3 = row.insertCell(3)


            cell0.innerHTML = sku
            cell1.innerHTML = description
            cell2.innerHTML = price
            cell3.innerHTML = quantity
        })

}

//Search and add Client to the Cart
async function srcClient() { 

    
}