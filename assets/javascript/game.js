// this is the number of tries, starting at 10. Should be reduced each time you guess a wrong letter
var tries = 10;
// this is the array of guessed letters that will populate when a user clicks a key
var guesses = [];
// this is the array of secret words
var secretWord = "";

var wordBank = ["mario", "donkey kong", "link", "samus", "yoshi", "kirby", "fox", "pikachu", "luigi", "ness", "captain falcon", "jigglypuff", "peach", "daisy", "bowser", "ice climbers", "sheik", "zelda", "pichu", "falco", "marth", "young link", "ganondorf", "mewtwo", "roy", "mr. game & watch", "pit", "wario", "snake", "ike", "diddy kong", "lucas", "sonic", "king dedede", "olimar", "lucario", "r.o.b.", "toon link", "wolf", "villager", "mega man", "wii fit trainer", "rosalina & luma", "little mac", "greninja", "mii fighter", "palutena", "pac-man", "robin", "shulk", "bowser jr.", "duck hunt", "ryu", "ken", "cloud", "corrin", "bayonetta", "inkling", "ridley", "simon", "richter", "king k. rool", "isabelle", "incineroar", "piranha plant"];

var totalWins = 0;

var gameOver = true;


// Given a letter, see if it's in the word
function wordContainsLetter(letter, word) {
    // loops through the secret word
    for (var i = 0; i < word.length; i++) {
        // if the chosen letter is in the secret word, return true
        if (word.charAt(i) == letter) {
            return true;
        } 
    }
    // if the chosen letter is not in the secret word, return false
    return false;
}

// given list of letters, show the letters if in the word
function chosenLetters(letters, word) {
    var placeholder = "";
    // loops through the secret word
    for (var i = 0; i < word.length; i++) {
        console.log(word.charCodeAt(i));
        // if the letters are in the secret word
        if (letters.includes(word.charAt(i)) || word.charCodeAt(i) < 97 || word.charCodeAt(i) > 122) {
            // show secret letter in the word
            placeholder = placeholder + word.charAt(i) + " ";
        }   else {
            // show placeholder "_"
            placeholder = placeholder + "_ ";
        }
    }
    return placeholder;
}

// if a letter is in the word, show that letter. Else - reduce tries by one
function newGuess(guess) {
    if (guesses.includes(guess)) {
        return;
    }
    // creates array of guessed letters
    guesses.push(guess);
    document.getElementById("guessedLetters").innerText = guesses ;
    // calling already declared function on line 10
    if (wordContainsLetter(guess, secretWord)) {
        // assigning line 23 function to variable
        var endGame = chosenLetters(guesses, secretWord);
        // printing to console var endGame
        document.getElementById("currentWord").innerText = endGame;
        // if the placeholder is found in endGame, the player has not won
        if (endGame.indexOf("_") > -1) {
            return "Try again!";
        // if there are no placeholders left, the player has guessed the word    
        } else {
            totalWins++;
            document.getElementById("totalWins").innerText = totalWins;
            document.getElementById("youwin-image").style.display = "block";
            gameOver = true;
        }
    // if tries are greater than zero, the player still has a chance to win
    } else {
        tries--;
        // if tries equal 0, the player lost
        if (tries == 0) {
            document.getElementById("gameover-image").style.display = "block";
            document.getElementById("remainingGuesses").innerText = 0;
            gameOver = true;
        } else {
            document.getElementById("remainingGuesses").innerText = tries;
        }
    }
}

document.onkeyup = logKey;

function logKey(event) {
    if (gameOver == true) {
        resetGame();
        return;
    }
    if (event.keyCode <= 90 && event.keyCode >= 65 && tries > 0) {
        newGuess(event.key);
    }
}

function resetGame() {
    tries = 10;
    document.getElementById("remainingGuesses").innerText = 10;
    document.getElementById("totalWins").innerText = totalWins;
    guesses = [];
    document.getElementById("guessedLetters").innerText = "";
    secretWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    var endGame = chosenLetters(guesses, secretWord);
    document.getElementById("currentWord").innerText = endGame;
    gameOver = false;
    document.getElementById("gameover-image").style.display = "none";
    document.getElementById("youwin-image").style.display = "none";
}

