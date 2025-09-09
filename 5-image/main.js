var image1 = document.querySelector("#image1");
var image2 = document.querySelector("#image2");

var iImage1 = new Image();
iImage1.src = "image1.jpg";

var iImage2 = new Image();
iImage2.src = "image2.jpg";

var iBlank = new Image();
iBlank.src = "blank.jpg";

var lImage1 = false;
var lImage2 = false;


image1.onclick = function() {
	if ( lImage1 == false ) {
		image1.src = iImage1.src;
		lImage1 = true;
	}
	else {
		lImage1 = false;
		image1.src = iBlank.src;
	}
}

image2.onclick = function() {
	if ( lImage2 == false )  { 
		image2.src = iImage2.src;
		lImage2 = true;
	}
	else {
		lImage2 = false;
		image2.src = iBlank.src;
	}
}
