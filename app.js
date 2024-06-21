let randomNumber = parseInt(Math.random() * 100 + 1);
const userInput = document.querySelector("#guessField");
const guessSubmit = document.querySelector("#subt");
const PreviousGuesses = document.querySelector(".PreviousGuesses");
const remainingGuess = document.querySelector(".remaining");
const LowOrHigh = document.querySelector(".LowOrHigh");
const startOver = document.querySelector(".showResult");

const p = document.createElement("p");
console.log(randomNumber);
let prevGuess = [];
let attempts = 1;
let playGame = true;

if (playGame) {
    guessSubmit.addEventListener("click", (e) => {
        const guess = parseInt(userInput.value);
        e.preventDefault();
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if ((guess == "" || guess < 0 || guess > 100 || isNaN(guess))) {
        displayMessage("Invalid input. Start a new game.");
        endGame(true);
    } else {
        prevGuess.push(guess);
        if (attempts === 11) {
            displayGuess(guess);
            displayMessage(`Game Over, Random Number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("your guess is correct");
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("your number is too small of random Number");
    } else if (guess > randomNumber) {
        displayMessage("your number is too high of random Number");
    }
}

function displayGuess(guess) {
    PreviousGuesses.innerHTML += `${guess} `;
    userInput.value = "";
    attempts++;
    remainingGuess.innerHTML = `${11 - attempts}`
}
function displayMessage(message) {
    LowOrHigh.innerHTML = `<h2>${message}</h2>`
}
function endGame(isInvalid =false) {
    userInput.value = "";
    userInput.setAttribute('disabled', '')
    p.classList.add('button');
    p.innerHTML = '<button id="newGame">Start new Game</button>';
    startOver.appendChild(p);
    playGame = false;
    newGame(isInvalid);
}
function newGame(isInvalid = false) {
    const newGamebutton = document.querySelector('#newGame');
    newGamebutton.addEventListener('click', function (e) {
        randomNumber=parseInt(Math.random()*100+1);
        attempts=1;
        userInput.removeAttribute('disabled')
        prevGuess = [];
        PreviousGuesses.innerHTML='';
        remainingGuess.innerHTML=`${11-attempts}`;
        startOver.removeChild(p)
        LowOrHigh.innerHTML='';
        playGame = true;
    });
}