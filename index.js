
//This functions change the main component based on the menu button clicks
$(function(){
    $("#main").load("./src/components/ventas.html"); 
  });

  function vntFunction(){
    $("#main").load("./src/components/ventas.html");
  }

function prdFunction(){
    $("#main").load("./src/components/productos.html");
  }


//This is for selecting the table row
$('#infoTable').on('click', 'tbody tr', function(event) {
    $(this).addClass('highlight').siblings().removeClass('highlight');
});