
//This changes the table row's class when clicked to change its background color to red to be deleted
$("#prd").on('click', '.clickable-row', function(event){

    if($(this).hasClass('active')){
        $(this).removeClass('active'); 
    } 
    else {
        $(this).addClass('active').siblings().removeClass('active');
    }


})

//Get the existing Products and put them in a table
async function getPrds() {

    const ip = connectSRV();
  
    var table = document.getElementById('prd');
    var row;

    //First empty the Prds in the table. 
    //This is done so there are no repetition of items when you add a new item
    $('#prdBdyId').empty()
  
    await axios({
      method: 'get',
      url: `${ip}api/pos/getProducts`,
      headers: {
        'content-type': 'application/json',
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
      }
    })
      .then(function (response) {
  
        // console.log(response.data)
        // console.log(response.data.length)
        // console.log(response.data[0])
  
        var sku, description, price, quantity;
  
        for (var x = 0; x < response.data.length; x++) {
          sku = response.data[x].sku
          description = response.data[x].description
          price = response.data[x].price
          quantity = response.data[x].quantity
  
          //row = table.insertRow(x);
          row =  table.getElementsByTagName('tbody')[0].insertRow(x)
          row.className = "clickable-row"

          var cell0 = row.insertCell(0)
          var cell1 = row.insertCell(1)
          var cell2 = row.insertCell(2)
          var cell3 = row.insertCell(3)
  
          cell0.innerHTML = sku
          cell1.innerHTML = description
          cell2.innerHTML = price
          cell3.innerHTML = quantity
        }
  
      })
    
  }

//Delete a product
async function deletePrd(){

  const ip = connectSRV();

  // console.log($("#prd")[0].rows)
  // console.log($("#prd")[0].rows[1].cells[0].innerHTML)

  //X is rows.length - 1 because the head row is also counted
  var lng = $("#prd")[0].rows.length - 1;

  //Var x starts in index 1 to not count the header
  for(var x = 1; x < lng + 1; x++){

      // console.log($('#prd')[0].rows[x].value)

      //When you find the table row with className "clickable-row active", remove that row
      if($('#prd')[0].rows[x].className === "clickable-row active"){
        console.log("Row clicked: " + $("#prd")[0].rows[x].cells[0].innerHTML)

        await axios({
          method: 'delete',
          url: `${ip}api/pos/deleteProduct`,
          headers: {
            'content-type': 'application/json',
            'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBkMjUwNTY1ZmVjODg0NTJjYzZhMWNlIn0sImlhdCI6MTYyNTAxMTEwM30.5Vr4INSKQUcnyl2CBx7NLKbDcQltuFR5Hv3qFVK9Afs'
          },
          data: {
            sku: $("#prd")[0].rows[x].cells[0].innerHTML
          },
        })
        .then(function (response) {
          console.log(response)
        })
      }
      
  }

  //Call the getPrds function again to display the updated table
  getPrds()

  
}
  