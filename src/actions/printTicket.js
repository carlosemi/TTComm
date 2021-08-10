const {ipcRenderer} = require('electron');
const axios = require('axios');
const $ = require('jquery')
const fs = require('fs')


var table = document.getElementById('prt');

console.log(document)

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
    var totalTax = 0.00;

    var sku, description, price, items, tax, weight, quantity;

    var i = 0;

    for(var x in obj){

        sku = obj[x].sku
        description = obj[x].description
        price = obj[x].price
        items = obj[x].items
        // tax = obj[x].tax
        // weight = obj[x].weight
        // quantity = obj[x].quantity

        //console.log("Num of Items: " + items)

        //This inner loop is to update the totalCost depending on the quantity of one item so
        //if the quantity is greater than one it will correctly add according to the quantity
        for(var i = 0; i < items; i++){

            //Add the total of each item to display
            totalCost = totalCost + price

            //console.log("Tax " + tax)
            //If items contains tax added to the totalTax
            if(tax){

                totalTax = totalTax + (totalCost * TAX)
            }
        }

    
        row =  table.getElementsByTagName('tbody')[0].insertRow(x)

        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1)
        var cell2 = row.insertCell(2)

        cell0.innerHTML = sku + "  |"
        cell1.innerHTML = items + "  |"
        cell2.innerHTML = price + "  |"

    }


    //Write the sum of the total cost to the Ticket
    $("#totl").text("$" + totalCost.toFixed(2))

    //Write the tax of the total cost to the ticket
    //var totalTax = totalCost * TAX
    $("#tx").text("$" + totalTax.toFixed(2))

    //Write the sum of the total cost + tax to the ticket
    totalAndTax = totalCost + totalTax

    $("#totlAndTx").text("$" + totalAndTax.toFixed(2))
    
    // ipcRenderer.invoke('nowPrint').then((result) => {
    
    // })
    
});




  

