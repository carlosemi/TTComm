
//                       TABLE AND ROW FUNCTIONALITY

//This changes the table row's class when clicked to change its background color to red to be deleted
$("#vnt").on('click', '.clickable-row', function(event){

    //If you click the items to increase the number of that item, the background color changes.
    //The below function checks if the part clicked was the input type number, if it is then ommit changing
    //the class name so that the row is not highlighted with the red color
    if(event.target.type === 'number'){
       
        //If the number was actually clicked, also update the number of items on the db
 
        // console.log("Changing the number")

        // console.log("ID: " + event.target.id)
        var id = event.target.id;

        // console.log("Value: " + event.target.value)
        var newValue = event.target.value;

        let itemsJson = fs.readFileSync('./src/db/cart.json', 'utf-8')
        let items = JSON.parse(itemsJson)

        // console.log(items[id])

        items[id].items = newValue;
        itemsJson = JSON.stringify(items)

        fs.writeFileSync('./src/db/cart.json', itemsJson, 'utf-8')

        cart()
    }
    else{

        if($(this).hasClass('active')){
            $(this).removeClass('active'); 
        } 
        else {
            $(this).addClass('active').siblings().removeClass('active');
        }
    }

})

//                            CART FUNCTIONALITY

//Add, update and show Total
function cart() {

    var table = document.getElementById('vnt');
    var row;
    
    //First empty the items in the cart at init of the function call. 
    //This is done so there are no repetition of items when you add a new item
    $('#vntBdyId').empty()

    //If the file is empty, ommit the reading so there is no JSON syntax error. Else read the file 
    if((fs.readFileSync('./src/db/cart.json').length === 0)){
        console.log("Returned null")
        return null
    }
    else{
        // read JSON object from local cart db to show 
        fs.readFile('./src/db/cart.json', 'utf-8', (err, data) => {

            if (err) {
                console.log("This is the error")
                throw err;
            }

            // console.log(data)
            // console.log(JSON.parse(data))
            
            // parse JSON object
            var obj = JSON.parse(data);

            var totalCost = 0.00;
            var TAX = 0.16;
            var totalAndTax = 0.00;

            var sku, description, price, items, tax, weight, quantity;

            var i = 0;

            for(var x in obj){

                sku = obj[x].sku
                description = obj[x].description
                price = obj[x].price
                items = obj[x].items
                tax = obj[x].tax
                weight = obj[x].weight
                quantity = obj[x].quantity

                //console.log("Num of Items: " + items)

                //This inner loop is to update the totalCost depending on the quantity of one item so
                //if the quantity is greater than one it will correctly add according to the quantity
                for(var i = 0; i < items; i++){

                    //Add the total of each item to display
                    totalCost = totalCost + price
                }

            
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
                cell3.innerHTML = `<input id='${x}' type='number' min='1' max='${quantity}' value='${items}'>`
                cell4.innerHTML = quantity

            }

            //console.log(totalCost.toFixed(2))

            //Write the sum of the total cost to the Ticket
            $("#totl").text("$" + totalCost.toFixed(2))

            //Write the tax of the total cost to the ticket
            var totalTax = totalCost * TAX
            $("#tx").text("$" + totalTax.toFixed(2))

            //Write the sum of the total cost + tax to the ticket
            totalAndTax = totalCost + totalTax

            $("#totlAndTx").text("$" + totalAndTax.toFixed(2))
            $("#cashInput").attr('min', totalAndTax.toFixed(2))
        });
    }

}

async function deleteCart(){

    //Delete the db items 
    fs.truncate('./src/db/cart.json', 0, function(){console.log("cart errased")})

    //RE add the brackets of the json array after the file has been erased
    fs.writeFile('./src/db/cart.json', "[]", (err) => {
        if(err){
            throw err;
        }
        console.log("Re added brackets");
    });

    //Call the cart fucntion to display again
    cart()



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

            const data = {sku: response.data.sku, description: response.data.description, price: response.data.price, items: 1, quantity: response.data.numOfItems}

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

//Delete item from the cart 
async function deleteItem(){

    // console.log($("#vnt"))

    // console.log($("#vnt")[0].rows.length)

    //X is rows.length - 1 because the head row is also counted
    var lng = $("#vnt")[0].rows.length - 1;

    //Var x starts in index 1 to not count the header
    for(var x = 1; x < lng + 1; x++){

        //console.log($('#vnt')[0].rows[x].className)

        //When you find the table row with className "clickable-row active", remove that row
        if($('#vnt')[0].rows[x].className === "clickable-row active"){

            //console.log("True")

            console.log("splicing index " + x)

            //Read the cart db file, parse array of items and delete the one with the according index
            let itemsJson = fs.readFileSync('./src/db/cart.json', 'utf-8')

            let items = JSON.parse(itemsJson)

            //x is - 1 when splicing because the index in reality one less because of the table header issue above
            items.splice(x - 1,1)

            itemsJson = JSON.stringify(items)

            fs.writeFileSync('./src/db/cart.json', itemsJson, 'utf-8')

            cart() 

            break 

        }
        
    }

    
}

//Charge
async function cashCharge() {

    const ip = connectSRV();
    var cash = $("#cashInput").val()
    var cashBack;

    console.log(cash)

    var totalTax = $("#totlAndTx").text()
    totalAndTax = totalTax.replace('$','')
    console.log("Total and Tax: " + totalAndTax)

    if(cash < totalAndTax){
        console.log("Invalid Amount")
        //Get out of charging
        return 
    }
    else{
        
        cashBack = cash - totalAndTax
        console.log("Cashback: " + cashBack.toFixed(2))

        // read JSON object from local cart db to show 
        fs.readFile('./src/db/cart.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            var numOfTickets

            //Do a call to get the number of ticket documents to increment the id number
            axios({
                method: 'get',
                url: `${ip}api/pos/numOfTickets`,
                headers: {
                    'content-type': 'application/json',
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
                }
            })
            .then(function (response){

                console.log("Response data: " + response.data)
                numOfTickets = response.data

                // parse JSON object
                var obj = JSON.parse(data);
                var sku;

                //Write the sum of the total cost to the Ticket
                var total = $("#totl").text()

                //Write the tax of the total cost to the ticket
                var totalTax = $("#tx").text()

                var skus = []

                for(var x in obj){
                    sku = obj[x].sku
                    skus.push(sku)
                    console.log(sku)
                }

                console.log(skus)
                totalTax = totalTax.replace('$','')
                total = total.replace('$', '')

                console.log(totalTax)

                //Increment the number of tickets
                numOfTickets = numOfTickets + 1

                console.log(numOfTickets)

                axios({
                    method: 'post',
                    url: `${ip}api/pos/addTicket`,
                    headers: {
                        'content-type': 'application/json',
                        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
                    },
                    data: {
                        id: numOfTickets,
                        products: [skus],
                        tax: totalTax,
                        total: total
                    }
                })
                    .then(function (response) {
            
                        console.log(response.data)

                        if(response.data === "Success"){
                            //If the call was success, erase everything in the cart 

                            deleteCart()

                            ipcRenderer.invoke('cashbackWindow', cashBack).then((result) => {
                                // console.log(result)
                            })
                                     
                            $("#totl").text("$0.00")
                            $("#tx").text("$0.00")
                            $("#totlAndTx").text("$0.00")
                            
                        }
                    
            
                    });
        
            });
        });

    }
}



//Print Ticket