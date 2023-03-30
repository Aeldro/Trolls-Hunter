// Variables globales

const startButton = document.getElementById('startButton');
const bestScoreZone = document.getElementById('bestScore');
const scoreZone = document.getElementById('score');
const canvas = document.getElementById('canvas');
const gameOverScreen = document.getElementById('gameOverScreen');

let rowSpawnInterval = 1000;
let isGameRunning = false;

let score = 0;
let bestScore = 0;


// Événements

startButton.addEventListener('click', () => {
    runningGame()
});

canvas.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains("troll") && isGameRunning) {
        e.target.remove();
        increaseScore();
    } else if (!e.target.classList.contains("troll") && isGameRunning) {
        score -= 1;
        if (score < 0) {
            score = 0;
        }
        scoreZone.innerHTML = `Score : ${score}`;
    }
})


// Fonctions

function init() {
    isGameRunning = false;
    rowSpawnInterval = 1000;
    score = 0;
    scoreZone.innerHTML = `Score : ${score}`;
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }
    canvas.classList.remove("hidden");
    gameOverScreen.classList.add("hidden");
}

function runningGame() {
    if (isGameRunning) {
        isGameRunning = false;
        startButton.innerHTML = "Jouer";
        startButton.href = ""
        init();
    } else {
        isGameRunning = true;
        startButton.innerHTML = "Quitter";
        startButton.href = "#infoSpace"
        spawnTroll();
    }

}

function spawnTroll() {
    if (isGameRunning) {
        if (canvas.childElementCount < 10) {
            // Défini l'image de la cible
            let generatedTroll = new Image();
            generatedTroll.classList.add('troll');
            generatedTroll.src = `medias/troll${(Math.floor(Math.random() * 4)) + 1}.png`;

            // Génère la taille de la cible
            let trollWidth = Math.random() * 40 + 40; // Taille mini = 40px || Taille maxi = 80px
            generatedTroll.style.setProperty('--width', trollWidth + "px");

            // Défini l'emplacement de la cible
            let x = Math.random() * canvas.offsetWidth;
            let y = Math.random() * canvas.offsetHeight;
            if (x > canvas.offsetWidth - trollWidth) {x = x - (trollWidth / 2);}
            if (x < 0 + trollWidth) {x = x + (trollWidth / 2);}
            if (y > canvas.offsetHeight - trollWidth) {y = y - (trollWidth / 2);}
            if (y < 0 + trollWidth) {y = y + (trollWidth / 2);}
            x = x - (trollWidth / 2)
            y = y - (trollWidth / 2)
            generatedTroll.style.setProperty('--x', x + "px");
            generatedTroll.style.setProperty('--y', y + "px");

            // Fait apparaître la cible
            canvas.appendChild(generatedTroll);

            // Animation de la cible
            let newX = Math.random() * canvas.offsetWidth;
            let newY = Math.random() * canvas.offsetHeight;
            if (newX > canvas.offsetWidth - trollWidth) {newX = newX - (trollWidth / 2);}
            if (newX < 0 + trollWidth) {newX = newX + (trollWidth / 2);}
            if (newY > canvas.offsetHeight - trollWidth) {newY = newY - (trollWidth / 2);}
            if (newY < 0 + trollWidth) {newY = newY + (trollWidth / 2);}
            newX = newX - (trollWidth / 2)
            newY = newY - (trollWidth / 2)
            generatedTroll.style.setProperty('--newX', newX + "px");
            generatedTroll.style.setProperty('--newY', newY + "px");

            console.log("x :" + Math.floor(newX));
            console.log("y :" + Math.floor(newY));

            // Intervale entre les spawns
            rowSpawnInterval = rowSpawnInterval - (0.1 / 10 * rowSpawnInterval);
            let spawnInterval = rowSpawnInterval + 200;
            setTimeout(() => {
                spawnTroll();
            }, spawnInterval);
        } else {
            gameOver();
        }
    }
}

function increaseScore() {
    if (score >= bestScore) {
        score += 1;
        bestScore += 1;
        bestScoreZone.innerHTML = `Meilleur score : ${bestScore}`;
    } else {
        score += 1;
    }
    scoreZone.innerHTML = `Score : ${score}`;
}

function gameOver() {
    canvas.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
}