
// get all elements/buttons with class="buttons"
var aButtons = document.querySelectorAll(".buttons"); 
// it's like declaring an array of aButtons.... aButtons[0],aButtons[1].....

var output = document.querySelector("#output");

// Assign onclick events to all the buttons using a for loop
for ( var i = 0; i < aButtons.length; i++ ) {  // aButtons.length is the number of elements

	aButtons[i].onclick = function() {
		
		// <button class="button" text="1"....... this.getAttribute("text") gets the value of [text] attribute
		output.innerHTML += this.getAttribute("text")+"<br>";
						 // this = aButtons[i]
		this.disabled = true; // disable the current button
		
	}
	
}

// querySelectorAll is very usefull if you will use elements of the same type

