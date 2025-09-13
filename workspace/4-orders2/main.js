var product1 = document.querySelector("#product1"); // id="product1"
var quantity1 = document.querySelector("#quantity1"); // id="quantity1"
var remarks1 = document.querySelector("#remarks1"); // id="remarks1"
var amount1 = document.querySelector("#amount1");

var product2 = document.querySelector("#product2"); // id="product2"
var quantity2 = document.querySelector("#quantity2"); // id="quantity2"
var remarks2 = document.querySelector("#remarks2"); // id="remarks2"
var amount2 = document.querySelector("#amount2");

var total = document.querySelector("#total");

var btn_done = document.querySelector("#btn_done");

var receipt = document.querySelector("#receipt");

var tendered = document.querySelector("#tendered");

var amount_change = document.querySelector("#amount_change");


tendered.onkeyup = function() {

	var nChange = parseFloat(this.value)-parseFloat(total.value); // this.value = tendered.value
	amount_change.value = nChange.toFixed(2);
	
}


function Total() {


	var nTotal = 0;
	nTotal = parseFloat(amount1.value)+parseFloat(amount2.value);
	total.value = nTotal.toFixed(2);
	if ( nTotal > 0 ) 
		btn_done.disabled=false;
	else
		btn_done.disabled=true;
	
}

btn_done.onclick = function() {
	
	var cOrders = "";
	
	cOrders = "<table>";
	if ( parseFloat(amount1.value) > 0 ) {
		
		var nPrice = parseFloat(product1.value); // <option value="10"
		var nQty = parseInt(quantity1.value);
		var cProduct = product1.options[product1.selectedIndex].text; // <option value="10">Palammig
		cOrders += "<tr><td>"+nQty+"</td><td>"+cProduct+" P"+nPrice+"</td><td>"+amount1.value+"</td></tr>";
		
	}
	
	if ( parseFloat(amount2.value) > 0 ) {
		
		var nPrice = parseFloat(product2.value); // <option value="10"
		var nQty = parseInt(quantity2.value);
		var cProduct = product2.options[product2.selectedIndex].text; // <option value="10">Palammig
		cOrders += "<tr><td>"+nQty+"</td><td>"+cProduct+" P"+nPrice+"</td><td>"+amount2.value+"</td></tr>";
		
	}
	cOrders += "<tr><td align='right' colspan='2'>Total</td><td align='right'>"+total.value+"</td></tr>";
	cOrders +="</table>";
	tendered.disabled=false;
	
	receipt.innerHTML = cOrders;
	
}

function Compute1() {
										// <select id="product"
	var nPrice = parseFloat(product1.value); // <option value="10"
	
	var nQty = parseInt(quantity1.value);
	
	var cProduct = product1.options[product1.selectedIndex].text; // <option value="10">Palammig
	
	cProduct += "<img src='"+product1.selectedIndex+".jpg'></img>";
	
	if ( nPrice > 0 )
		remarks1.innerHTML = nQty + " X "+cProduct+" P"+nPrice;
	
	amount1.value = (nPrice*nQty).toFixed(2);
	Total();
	
}


product1.onchange = function() {
	
	Compute1();
	
}

quantity1.onchange = function() {
	
	Compute1();
	
}

function Compute2() {
										// <select id="product"
	var nPrice = parseFloat(product2.value); // <option value="20"
	
	var nQty = parseInt(quantity2.value);
	
	var cProduct = product2.options[product2.selectedIndex].text; // <option value="20">Palammig
	
	cProduct += "<img src='"+product2.selectedIndex+".jpg'></img>";
	
	if ( nPrice > 0 )
		remarks2.innerHTML = nQty + " X "+cProduct+" P"+nPrice;
	
	amount2.value = (nPrice*nQty).toFixed(2);
	Total();
	
}


product2.onchange = function() {
	
	Compute2();
	
}

quantity2.onchange = function() {
	
	Compute2();
	
}

