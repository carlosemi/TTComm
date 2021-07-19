
//This changes the table row's class when clicked to change its background color to red
$("#vnt").on('click', '.clickable-row', function(event){
    if($(this).hasClass('active')){
        $(this).removeClass('active'); 
      } else {
        $(this).addClass('active').siblings().removeClass('active');
      }
})




//Add, update, and delete items in the cart 
function cart() {

    var table = document.getElementById('vnt');
    var row;


    //First empty the items in the cart at init of the function call. 
    //This is done so there are no repetition of items when you add a new item
    $('#vntBdyId').empty()


    //If the file is empty, ommit the reading so there is no JSON syntax error. Else read the file 
    if((fs.readFileSync('./src/db/cart.json').length === 0)){
        return null
    }
    else{
        // read JSON object from local cart db to show 
        fs.readFile('./src/db/cart.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            console.log(data)
            console.log(JSON.parse(data))
            
            // parse JSON object
            var obj = JSON.parse(data);

            var sku, description, price, quantity;

            for(var x in obj){

                console.log(sku)

                sku = obj[x].sku
                description = obj[x].description
                price = obj[x].price
                quantity = obj[x].quantity


                row =  table.getElementsByTagName('tbody')[0].insertRow(x)

                row.className = "clickable-row"

                var cell0 = row.insertCell(0)
                var cell1 = row.insertCell(1)
                var cell2 = row.insertCell(2)
                var cell3 = row.insertCell(3)
                var cell4 = row.insertCell(4)


                cell0.innerHTML = sku
                cell1.innerHTML = description
                cell2.innerHTML = price
                cell3.innerHTML = `<div class='col-6'><input type='number' value='1'></div>`
                cell4.innerHTML = quantity
            }
        });
    }
  
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

            //console.log(response.data)

            const data = {sku: response.data.sku, description: response.data.description, price: response.data.price, quantity: response.data.quantity}

            console.log(data)

            //console.log(fs.readFileSync('./src/db/cart.json').length)

            //If file is empty do not push, instead create. Else, Push into array of objects
            //This is done to avoid JSON syntax errors
            if((fs.readFileSync('./src/db/cart.json').length === 0)){

                console.log("File is empty")

                // itemsJson = fs.readFile('./src/db/cart.json')
                fs.writeFile('./src/db/cart.json', "[" + JSON.stringify(data) + "]", (err) => {
                    if(err){
                        throw err;
                    }
                    console.log("JSON data is save");
                });
            }
            else{

                let itemsJson = fs.readFileSync('./src/db/cart.json', 'utf-8')

                let items = JSON.parse(itemsJson)

                items.push(data)

                itemsJson = JSON.stringify(items)

                fs.writeFileSync('./src/db/cart.json', itemsJson, 'utf-8')

            }

            cart()

        })

}

//Search and add Client to the Cart
async function srcClient() { 

}