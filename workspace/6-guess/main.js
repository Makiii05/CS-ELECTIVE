var image1 = document.querySelector("#image1");
var image2 = document.querySelector("#image2");
var image3 = document.querySelector("#image3");

var image4 = document.querySelector("#image4");
var image5 = document.querySelector("#image5");
var image6 = document.querySelector("#image6");

var image7 = document.querySelector("#image7");
var image8 = document.querySelector("#image8");
var image9 = document.querySelector("#image9");

var score = document.querySelector("#score");

var nCorrect = Math.floor((Math.random() * 9) + 1);
var nTries = 0;
var nScore = 0;
var lImage1 = false;
var lImage2 = false;
var lImage3 = false;
var lImage4 = false;
var lImage5 = false;
var lImage6 = false;
var lImage7 = false;
var lImage8 = false;
var lImage9 = false;


image1.onclick = function() {
	
	if ( lImage1 == true ) // Napindot na
		return;
		
	if ( nCorrect == 1 ) {
		
		image1.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},300); // Execute the commands after 300 ms
	}
	else {
		image1.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage1 = true;
			}
		},300);
	}
	
}

image2.onclick = function() {
	
	if ( lImage2 == true ) // Napindot na
		return;
		
	if ( nCorrect == 2 ) {
		
		image2.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},300);
	}
	else {
		image2.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage2 = true;
			}
		},300);
	}
	
}

image3.onclick = function() {
	
	if ( lImage3 == true ) // Napindot na
		return;
		
	if ( nCorrect == 3 ) {
		
		image3.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},300);
	}
	else {
		image3.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage3 = true;
			}
		},300);
	}
	
}

image4.onclick = function() {
	
	if ( lImage4 == true ) // Napindot na
		return;
		
	if ( nCorrect == 4 ) {
		
		image4.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},400);
	}
	else {
		image4.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage4 = true;
			}
		},400);
	}
	
}

image5.onclick = function() {
	
	if ( lImage5 == true ) // Napindot na
		return;
		
	if ( nCorrect == 5 ) {
		
		image5.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},500);
	}
	else {
		image5.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage5 = true;
			}
		},500);
	}
	
}

image6.onclick = function() {
	
	if ( lImage6 == true ) // Napindot na
		return;
		
	if ( nCorrect == 6 ) {
		
		image6.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},600);
	}
	else {
		image6.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage6 = true;
			}
		},600);
	}
	
}

image7.onclick = function() {
	
	if ( lImage7 == true ) // Napindot na
		return;
		
	if ( nCorrect == 7 ) {
		
		image7.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},700);
	}
	else {
		image7.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage7 = true;
			}
		},700);
	}
	
}

image8.onclick = function() {
	
	if ( lImage8 == true ) // Napindot na
		return;
		
	if ( nCorrect == 8 ) {
		
		image8.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},800);
	}
	else {
		image8.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage8 = true;
			}
		},800);
	}
	
}

image9.onclick = function() {
	
	if ( lImage9 == true ) // Napindot na
		return;
		
	if ( nCorrect == 9 ) {
		
		image9.src = "right.jpg";
		nScore++;
		score.innerHTML = "Score : "+nScore;
		
		window.setTimeout(function() {
			alert("You got it right!");
			Reset();
		},900);
	}
	else {
		image9.src = "wrong.jpg";
		nTries++;
		window.setTimeout(function() {
			if ( nTries == 3 ) {
				GameOver();
				
			}
			else {
				alert("Wrong guess! "+(3-nTries)+" left.");
				lImage9 = true;
			}
		},900);
	}
	
}

function GameOver() {
	
	ShowCorrect();
	window.setTimeout(function() {
		alert("Game over!");
		location.reload();
	},300);
}

function ShowCorrect() {
		
	if ( nCorrect == 1 ) {
		image1.src = "right.jpg";
	}
	else if ( nCorrect == 2 ) {
		image2.src = "right.jpg";
	}
	else if ( nCorrect == 3 ) {
		image3.src = "right.jpg";
	}
	else if ( nCorrect == 4 ) {
		image4.src = "right.jpg";
	}
	else if ( nCorrect == 5 ) {
		image5.src = "right.jpg";
	}
	else if ( nCorrect == 6 ) {
		image6.src = "right.jpg";
	}
	else if ( nCorrect == 7 ) {
		image7.src = "right.jpg";
	}
	else if ( nCorrect == 8 ) {
		image8.src = "right.jpg";
	}
	else if ( nCorrect == 9 ) {
		image9.src = "right.jpg";
	}
	
	
}

function Reset() {
	
	image1.src = "blank.jpg";
	image2.src = "blank.jpg";
	image3.src = "blank.jpg";
	image4.src = "blank.jpg";
	image5.src = "blank.jpg";
	image6.src = "blank.jpg";
	image7.src = "blank.jpg";
	image8.src = "blank.jpg";
	image9.src = "blank.jpg";
	
	lImage1 = false;
	lImage2 = false;
	lImage3 = false;
	lImage4 = false;
	lImage5 = false;
	lImage6 = false;
	lImage7 = false;
	lImage8 = false;
	lImage9 = false;
	
	nTries = 0;
	nCorrect = Math.floor((Math.random() * 9) + 1);
}

