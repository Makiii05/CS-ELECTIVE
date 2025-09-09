const grid = document.querySelector("#grid");
const time_con = document.querySelector("#time");
const score_con = document.querySelector("#score");
const round_con = document.querySelector("#round");
const selection_con = document.querySelector("#selection")

let round = 0;
let treasures = [];
let score = 0;
let time = 10;
let selection = 0;
let timerInterval;
let isGuessed = false;
let gameActive = false;

//checked
function gameOver() {
    //game pause
    clearInterval(timerInterval);
    gameActive = false;
    
    //alert
    setTimeout(() => {
        alert(`Game Over! Final Score: ${score}\nYou completed ${round - 1} rounds!`);
        grid.innerHTML = "";
        gameStart();
    }, 100);
}

//checked
function createCard() {
    //game pause
    gameActive = false;
    clearInterval(timerInterval);
    
    //reset round
    time = 10;
    time_con.innerHTML = time + "s";
    grid.innerHTML = ""; 
    treasures = [];
    selection = 0;
    isGuessed = false;
    selection_con.innerHTML = selection;

    // Create treasures
    while (treasures.length < 2) {
        let newTreasure = Math.floor(Math.random() * 9);
        if (!treasures.includes(newTreasure)) {
            treasures.push(newTreasure);
        }
    }

    for (let i = 0; i < 9; i++) {
        // Create cards
        let isHere = treasures.includes(i);
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-has-treasure", isHere);

        //onclick
        card.onclick = function () {
            if (!gameActive) return; 
            if (card.innerHTML !== "") return;
            
            selection++;
            selection_con.innerHTML = selection;

            let foundTreasure = this.getAttribute("data-has-treasure") === "true";
            if (foundTreasure) {
                this.innerHTML = "<img src='cattime.gif'>";
                this.style.backgroundColor = "green";
                score++;
                score_con.innerHTML = score;
                isGuessed = true;
            } else {
                this.style.backgroundColor = "red";
            }

            // how to end the game(if continue or gameover)
            if (selection >= 2 || isGuessed) {
                gameActive = false;
                clearInterval(timerInterval);

                if(!isGuessed){
                    setTimeout(gameOver, 100);
                    return;
                }

                setTimeout(() => {
                    round++;
                    round_con.innerHTML = round;
                    createCard();
                    startTimer();
                }, 2500);
            }
        };

        grid.appendChild(card);
    }
    
    gameActive = true 
}

//checked
function gameStart() {
    //reset game
    score = 0;
    round = 1;
    time = 10;
    selection = 0;
    gameActive = false;
    
    selection_con.innerHTML = selection;
    score_con.innerHTML = score;
    round_con.innerHTML = round;
    time_con.innerHTML = time + "s";

    createCard();
    startTimer();
}

//checked
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!gameActive) return;
        
        time--;
        time_con.innerHTML = time + "s";
        if (time <= 0) {
            gameOver();
        }
    }, 1000);
}

// Start the game
gameStart();