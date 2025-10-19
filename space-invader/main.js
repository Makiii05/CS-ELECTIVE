// Menu buttons
const btn = document.querySelectorAll(".btn");
const selector = document.querySelectorAll(".selector");

// Containers
const menuCon = document.querySelector("#menu-con");
const hpCon = document.querySelector("#hp-con");
const statsCon = document.querySelector("#stats-con");
const mainCon = document.querySelector("#main-con");
const infiCon = document.querySelector("#infi-con");
const instructionCon = document.querySelector("#instruction-con");
const leaderboardCon = document.querySelector("#leaderboard-con");

const scoreEl = document.getElementById("scoreEl");
const roundEl = document.getElementById("roundEl");
const enemyEl = document.getElementById("enemyEl");

// Global trackers
const keys = {};
let bullets = [];
let enemies = [];
let curRound;
let gameLoopRunning = false;
let gameLoopId = null;
let currentPlayer = null;
let keyHandlers = { down: null, up: null };

// Stats
let playerHp = 100
let score = 0
let enemyCount = 0;

// Extra
let menu_btn_selected_id = 0;
let page = "Menu";

// Rounds: [type, number, speed, hp]
const classicRound = {
    1: ["line", 20, 1000, 1],
    2: ["diagonal", 20, 1000, 1],
    3: ["arrow", 20, 1000, 1],
    4: ["boss", 1, 1000, 20],
    5: ["line", 30, 750, 1],
    6: ["diagonal", 30, 750, 1],
    7: ["arrow", 30, 750, 1],
    8: ["boss", 1, 1000, 30],
    9: ["line", 50, 500, 1],
    10: ["diagonal", 50, 500, 1],
    11: ["arrow", 50, 500, 1],
    12: ["boss", 1, 1000, 40],
};

// --- Menu Logic ---
function updateSelection() {
    btn.forEach((b, i) => {
        if (i === menu_btn_selected_id) {
            b.classList.add("fs-5");
            selector[i].classList.remove("d-none");
        } else {
            b.classList.remove("fs-5");
            selector[i].classList.add("d-none");
        }
    });
}

function updatePage() {
    // Hide all containers
    [menuCon, hpCon, statsCon, mainCon, infiCon, instructionCon, leaderboardCon].forEach(el => {
        el.classList.add("d-none");
    });

    // Stop any running game
    stopGame();

    if (page === "Menu") {
        resetGameState();
        menuCon.classList.remove("d-none");
    } else if (page === "Classic Mode") {
        curRound = 1;
        mainCon.classList.remove("d-none");
        hpCon.classList.remove("d-none");
        statsCon.classList.remove("d-none");
        startCountdown(mainCon);
    } else if (page === "Infinite Mode") {
        infiCon.classList.remove("d-none");
        hpCon.classList.remove("d-none");
        statsCon.classList.remove("d-none");
    } else if (page === "Instruction") {
        instructionCon.classList.remove("d-none");
    } else if (page === "Leaderboard") {
        leaderboardCon.classList.remove("d-none");
    }
}

function updateStats() {
    scoreEl.innerText = score
    roundEl.innerText = curRound + "/" + Object.keys(classicRound).length;
    enemyCount =  enemies.length
    enemyEl.innerText = enemyCount
}

function resetGameState() {
    // basic stats
    playerHp = 100;
    nextRoundCalled = false;

    // rounds / gameplay trackers
    curRound = null;
    gameLoopRunning = false;
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }

    // remove any lingering event listeners
    if (keyHandlers.down) {
        document.removeEventListener("keydown", keyHandlers.down);
        keyHandlers.down = null;
    }
    if (keyHandlers.up) {
        document.removeEventListener("keyup", keyHandlers.up);
        keyHandlers.up = null;
    }

    // remove player element
    if (currentPlayer && currentPlayer.el && currentPlayer.el.parentNode) {
        currentPlayer.el.remove();
    }
    currentPlayer = null;

    // clear bullets and enemies (DOM & intervals)
    bullets.forEach(b => {
        if (b.el && b.el.parentNode) b.el.remove();
        if (b.moveInterval) clearInterval(b.moveInterval);
    });
    enemies.forEach(e => {
        if (e.el && e.el.parentNode) e.el.remove();
        if (e.moveInterval) clearInterval(e.moveInterval);
    });

    bullets = [];
    enemies = [];

    // clear pressed keys
    Object.keys(keys).forEach(k => delete keys[k]);

    // reset menu selection
    menu_btn_selected_id = 0;
    updateSelection();

    // clear main container UI
    mainCon.innerHTML = "";
    hpCon.classList.add("d-none");
    statsCon.classList.add("d-none");
}

function stopGame() {
    gameLoopRunning = false;
    
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }
    
    // Remove event listeners
    if (keyHandlers.down) {
        document.removeEventListener("keydown", keyHandlers.down);
        keyHandlers.down = null;
    }
    if (keyHandlers.up) {
        document.removeEventListener("keyup", keyHandlers.up);
        keyHandlers.up = null;
    }
    
    // Clear player
    if (currentPlayer && currentPlayer.el && currentPlayer.el.parentNode) {
        currentPlayer.el.remove();
    }
    currentPlayer = null;
    
    // Clear all bullets and enemies
    bullets.forEach(b => {
        if (b.el && b.el.parentNode) {
            b.el.remove();
        }
        if (b.moveInterval) {
            clearInterval(b.moveInterval);
        }
    });
    
    enemies.forEach(e => {
        if (e.el && e.el.parentNode) {
            e.el.remove();
        }
        if (e.moveInterval) {
            clearInterval(e.moveInterval);
        }
    });
    
    bullets = [];
    enemies = [];
    
    // Clear keys
    Object.keys(keys).forEach(key => delete keys[key]);
}


function startCountdown(pageCon) {
    pageCon.innerHTML = `
        <div id="countdown-con" class="fs-1 text-center border d-flex flex-column align-items-center justify-content-center h-100">
            <small class="fs-3">(${page})</small>
            <p>GET READY!</p>
            <p>GAME STARTS IN</p>
        </div>`;
    
    const countdownEl = document.createElement("p");
    document.getElementById("countdown-con").appendChild(countdownEl);
    let count = 3;

    const timer = setInterval(() => {
        if (count > 0) {
            countdownEl.innerText = count;
            count--;
        } else {
            countdownEl.innerText = "GO!";
            clearInterval(timer);

            setTimeout(() => {
                if (page === "Classic Mode") {
                    pageCon.innerHTML = "";
                    classicMode(mainCon);
                }
            }, 1000);
        }
    }, 1000);
}

// --- Core Game ---
function classicMode(container) {
    // Clear old arrays and stop any running game
    stopGame();

    // Player setup
    currentPlayer = new Player(100, 1);
    currentPlayer.render(container);

    // Input handlers (using named functions to avoid duplicates)
    keyHandlers.down = (e) => {
        keys[e.key] = true;
        if (e.key === " " && gameLoopRunning && currentPlayer) {
            e.preventDefault();
            currentPlayer.shoot(container);
        }
    };

    keyHandlers.up = (e) => {
        keys[e.key] = false;
    };

    // Add event listeners
    document.addEventListener("keydown", keyHandlers.down);
    document.addEventListener("keyup", keyHandlers.up);

    // Enemy setup
    const roundData = classicRound[curRound];
    if (!roundData) {
        console.error("Invalid round:", curRound);
        return;
    }

    const [type, number, speed, hp] = roundData;

    if (type === "line") {
        spawnLineEnemies(container, number, speed, hp);
    } else if (type === "diagonal") {
        spawnDiagonalEnemies(container, number, speed, hp);
    } else if (type === "arrow") {
        spawnArrowEnemies(container, number, speed, hp);
    } else if (type === "boss") {
        spawnBoss(container, speed, hp);
    }

    // Start game loop
    gameLoopRunning = true;
    function gameLoop() {
        if (!gameLoopRunning) return;

        if (currentPlayer) {
            if (keys["ArrowLeft"]) currentPlayer.move("left");
            if (keys["ArrowRight"]) currentPlayer.move("right");
        }
        
        checkCollisions();
        
        gameLoopId = requestAnimationFrame(gameLoop);
    }
    gameLoop();
    updateStats()
}

// --- Enemy Spawning Functions ---
function spawnLineEnemies(container, number, speed, hp) {
    let x = 0;
    let y = 5;
    let min = 0;
    let max = 100 - (number / 2 * 5);

    for (let i = 0; i < number; i++) {
        if (i === number / 2) {
            y = 10;
            x = 0;
            min = 0;
            max = 100 - (number / 2 * 5);
        }

        const enemy = new Enemy(x, y, speed, hp, "line");
        enemy.render(container);
        enemy.move(min, max);
        updateStats()

        min += 5;
        max += 5;
        x += 5;
    }
}

function spawnDiagonalEnemies(container, number, speed, hp) {
    let summoned = 0;

    const spawn = setInterval(() => {
        if (summoned >= number || !gameLoopRunning) {
            clearInterval(spawn);
            return;
        }

        const enemy = new Enemy(0, 0, speed, hp, "diagonal");
        enemy.render(container);
        enemy.move(0, 95);
        updateStats()
        
        summoned++;
    }, 400);
}

function spawnArrowEnemies(container, number, speed, hp) {
    // Arrow formation - V shape
    const centerX = 50;
    const spacing = 5;
    
    for (let i = 0; i < number; i++) {
        const offset = (i - number / 2) * spacing;
        const x = centerX + offset;
        const y = 5 + (number / 2 - Math.abs(i - number / 2)) * 1.8;
        
        const enemy = new Enemy(x, y, speed, hp, "arrow");
        enemy.render(container);
        enemy.move(x + 20, x - 10);
        updateStats()
    }
}

function spawnBoss(container, speed, hp) {
    const enemy = new Enemy(45, 10, speed, hp, "boss");
    enemy.el.style.width = "15%"; // Make boss bigger
    enemy.render(container);
    enemy.move(10, 80);
    updateStats()
}

// --- Collision Handling ---
let nextRoundCalled = false;

function checkCollisions() {
    if (!gameLoopRunning) return;

    // Check bullet-enemy collisions
    bullets.forEach(bullet => {
        if (bullet.remove || !bullet.el) return;
        
        const bRect = bullet.el.getBoundingClientRect();

        enemies.forEach(enemy => {
            if (enemy.remove || !enemy.el || bullet.remove) return;
            
            const eRect = enemy.el.getBoundingClientRect();

            if (
                bRect.left < eRect.right &&
                bRect.right > eRect.left &&
                bRect.top < eRect.bottom &&
                bRect.bottom > eRect.top
            ) {
                enemy.hp--;
                score += 10
                updateStats()
                bullet.remove = true;

                // Enemy hit flash
                if (enemy.el) {
                    enemy.el.style.filter = "brightness(200%)";
                    setTimeout(() => {
                        if (enemy.el) {
                            enemy.el.style.filter = "brightness(100%)";
                        }
                    }, 100);
                }

                if (enemy.hp <= 0) {
                    enemy.remove = true;
                    if (enemy.el) {
                        enemy.el.src = "img/sprite/explode.gif";
                        setTimeout(() => {
                            if (enemy.el && enemy.el.parentNode) {
                                enemy.el.remove();
                            }
                        }, 500);
                    }
                }
            }
        });
    });

    // Remove hit bullets
    bullets = bullets.filter(b => {
        if (b.remove) {
            if (b.el && b.el.parentNode) {
                b.el.remove();
            }
            if (b.moveInterval) {
                clearInterval(b.moveInterval);
            }
            return false;
        }
        return true;
    });

    // Remove destroyed enemies
    enemies = enemies.filter(e => {
        if (e.remove) {
            if (e.moveInterval) {
                clearInterval(e.moveInterval);
            }
            return false;
        }
        return true;
    });

    // Check if round is complete (only if there are no enemies left)
    if (enemies.length === 0 && gameLoopRunning && !nextRoundCalled) {
        nextRoundCalled = true;
        nextRound();
        setTimeout(() => {
            nextRoundCalled = false;
        }, 4000)
    }
    checkPlayerEnemyCollision();
}

function checkPlayerEnemyCollision() {
    if (!currentPlayer || !currentPlayer.el) return;

    const pRect = currentPlayer.el.getBoundingClientRect();

    enemies.forEach(enemy => {
        if (enemy.remove || !enemy.el) return;

        const eRect = enemy.el.getBoundingClientRect();

        if (
            pRect.left < eRect.right &&
            pRect.right > eRect.left &&
            pRect.top < eRect.bottom &&
            pRect.bottom > eRect.top
        ) {
            // Collision happened
            playerHp -= 5;
            updateStats()

            // Flash player to indicate hit
            currentPlayer.el.style.filter = "brightness(50%)";
            setTimeout(() => {
                if (currentPlayer && currentPlayer.el)
                    currentPlayer.el.style.filter = "brightness(100%)";
            }, 200);

            // Remove enemy on contact
            enemy.hp = 0;
            enemy.remove = true;
            if (enemy.el) {
                enemy.el.src = "img/sprite/explode.gif";
                setTimeout(() => enemy.el?.remove(), 400);
            }

            // Optional: check for game over
            if (playerHp <= 0) {
                gameOver();
            }
        }
    });

    // Clean up removed enemies
    enemies = enemies.filter(e => !e.remove);
}

// ---- Round Handling ---
function gameOver() {
    stopGame();
    mainCon.innerHTML = `
        <div class="fs-1 text-center border d-flex flex-column align-items-center justify-content-center h-100 text-danger">
            <p>GAME OVER 💀</p>
            <p>Your HP reached 0</p>
            <p>Press ESC to return to Menu</p>
        </div>`;
}

function nextRound() {
    if (!gameLoopRunning) return; // Prevent multiple calls
    
    gameLoopRunning = false;
    curRound++;
    updateStats()


    if (classicRound[curRound]) {
        mainCon.innerHTML = `
            <div id="round-con" class="fs-1 text-center border d-flex flex-column align-items-center justify-content-center h-100">
                <p>ROUND ${curRound}</p>
                <p>GET READY!</p>
            </div>`;

        setTimeout(() => {
            if (page === "Classic Mode") {
                mainCon.innerHTML = "";
                classicMode(mainCon);
            }
        }, 2000);
    } else {
        mainCon.innerHTML = `
            <div class="fs-1 text-center border d-flex flex-column align-items-center justify-content-center h-100">
                <p>YOU WIN!</p>
                <p>All rounds completed 🎉</p>
            </div>`;
        stopGame();
    }
}

// --- Classes ---
class Player {
    constructor(hp, playerNo) {
        this.hp = hp;
        this.playerNo = playerNo;
        this.x = 45;
        this.y = 90;
        this.min_x = 0;
        this.max_x = 90;

        this.el = document.createElement("img");
        this.el.src = "img/sprite/player.png";
        this.el.style.position = "absolute";
        this.el.style.width = "10%";
        this.el.style.height = "auto";
        this.el.style.top = this.y + "%";
        this.el.style.left = this.x + "%";
        this.el.style.backgroundColor = "transparent";
    }

    render(container) {
        container.appendChild(this.el);
    }

    move(direction) {
        if (!gameLoopRunning) return;
        
        const moveSpeed = 0.5;
        if (direction === "left" && this.x > this.min_x) {
            this.x -= moveSpeed;
        }
        if (direction === "right" && this.x < this.max_x) {
            this.x += moveSpeed;
        }
        this.el.style.left = this.x + "%";
    }

    shoot(container) {
        if (!gameLoopRunning) return;
        
        const bulletX = this.x + 4.5;
        const bulletY = this.y - 5;
        const bullet = new Bullet(bulletX, bulletY);
        bullet.render(container);
    }
}

class Enemy {
    constructor(x, y, speed, hp, type) {
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.direction = "right";
        this.speed = speed;
        this.type = type;
        this.remove = false;
        this.moveInterval = null;

        this.el = document.createElement("img");
        this.el.src = "img/sprite/enemy.gif";
        this.el.style.position = "absolute";
        this.el.style.width = "5%";
        this.el.style.height = "auto";
        this.el.style.top = this.y + "%";
        this.el.style.left = this.x + "%";
        this.el.style.backgroundColor = "transparent";
    }

    render(container) {
        container.appendChild(this.el);
        enemies.push(this);
    }

    move(min, max) {
        this.moveInterval = setInterval(() => {
            if (this.hp <= 0 || this.remove || !gameLoopRunning) {
                clearInterval(this.moveInterval);
                this.moveInterval = null;
                return;
            }

            // Enemy reached bottom - game over condition
            if (this.y >= 95) {
                this.hp = 0;
                this.el.src = "img/sprite/explode.gif"
                this.remove = true;
                clearInterval(this.moveInterval);
                this.moveInterval = null;
                return;
            }

            if (this.type === "line" || this.type === "boss") {
                if (this.direction === "right") {
                    this.x += 1;
                    if (this.x >= max) {
                        this.direction = "left";
                        this.y += 2;
                    }
                } else {
                    this.x -= 1;
                    if (this.x <= min) {
                        this.direction = "right";
                        this.y += 2;
                    }
                }
            } else if (this.type === "diagonal") {
                if (this.direction === "right") {
                    this.x += 1;
                    if (this.x >= max) {
                        this.direction = "left";
                    }
                } else {
                    this.x -= 1;
                    if (this.x <= min) {
                        this.direction = "right";
                    }
                }
                this.y += 0.1;
            } else if (this.type === "arrow") {
                this.y += 0.5;
            }

            if (this.el) {
                this.el.style.top = this.y + "%";
                this.el.style.left = this.x + "%";
            }
        }, this.speed / 20);
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.remove = false;
        this.moveInterval = null;

        this.el = document.createElement("img");
        this.el.src = "img/sprite/bullet.png";
        this.el.className = "bullet";
        this.el.style.position = "absolute";
        this.el.style.width = "1%";
        this.el.style.height = "3%";
        this.el.style.left = this.x + "%";
        this.el.style.top = this.y + "%";
        this.el.style.backgroundColor = "transparent";
    }

    render(container) {
        container.appendChild(this.el);
        bullets.push(this);
        this.move();
    }

    move() {
        this.moveInterval = setInterval(() => {
            if (this.remove || !gameLoopRunning) {
                clearInterval(this.moveInterval);
                this.moveInterval = null;
                return;
            }

            this.y -= this.speed;

            if (this.y < 0) {
                clearInterval(this.moveInterval);
                this.moveInterval = null;
                this.remove = true;
                if (this.el && this.el.parentNode) {
                    this.el.remove();
                }
                bullets = bullets.filter(b => b !== this);
                return;
            }

            if (this.el) {
                this.el.style.top = this.y + "%";
            }
        }, 20);
    }
}

// --- Menu Navigation ---
document.addEventListener("keydown", (event) => {
    if (page === "Menu") {
        if (event.key === "ArrowUp" && menu_btn_selected_id > 0) {
            menu_btn_selected_id--;
        } else if (event.key === "ArrowDown" && menu_btn_selected_id < btn.length - 1) {
            menu_btn_selected_id++;
        } else if (event.key === "Enter") {
            const btn_selected = btn[menu_btn_selected_id];
            page = btn_selected.innerText;
            updatePage();
        }
        updateSelection();
    }

    if (event.key === "Escape") {
        page = "Menu";
        updatePage();
    }
});

// --- Initialize ---
function main() {
    updateSelection();
    updatePage();
}

main();