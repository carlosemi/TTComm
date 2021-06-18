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

function invFunction(){
  $("#main").load("./src/components/inventario.html");
}

function cliFunction(){
  $("#main").load("./src/components/clientes.html");
}


//This is for selecting the table row
$('#prd').on('click', 'tbody tr', function(event) {
  $(this).addClass('highlight').siblings().removeClass('highlight');
});
