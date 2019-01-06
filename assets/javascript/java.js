// Global Variables and Arrays
var wordOptions = ["seattle", "portland", "bellingham", "spokane", "tacoma", "beaverton", "olympia", "salem", "bend"];
var selectedWord = "";
var lettersInWord = [];
var numberOfBlanks = 0;
var blanksPlusCorrects = [];
var wrongGuesses = [];

// Game Counter
var winCount = 0;
var lossCount = 0;
var guessesRemaining = 0;

// Functions
function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numberOfBlanks = lettersInWord.length;

    // reset
    guessesRemaining = 15;
    wrongLetters = [];
    blanksPlusCorrects = [];

    // makes the right amount of blanks for each word
    for (var i = 0; i < numberOfBlanks; i++) {
        blanksPlusCorrects.push("_");
    }


    // change html to show which game number it is in the counter
    document.getElementById("wordToGuess").innerHTML = blanksPlusCorrects.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesRemaining;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Testing/Debugging
    console.log(selectedWord);
    console.log("letters in word " + lettersInWord);
    console.log("num blanks " + numberOfBlanks);
    // console.log("blanks and successes " + blanksPlusCorrects);

}

function checkLetters(letter) {
    // check if the letter exists anywhere in the word
    var isLetterInWord = false;

    for (var i = 0; i < numberOfBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    // check to find if the letter fits in the word, and then notate 
    if (isLetterInWord) {
        for (var i = 0; i < numberOfBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksPlusCorrects[i] = letter;
            }
        }
    }
    // if the letter wasn't found 
    else {
        wrongLetters.push(letter);
        guessesRemaining--;
    }

}

// keeps characters guesses to only letters
function isValidGuess(wordToGuess) {
    return /^[A-Za-z]$/.test();
}

function roundComplete() {
    console.log("Win count: " + winCount + " | Loss count: " + lossCount + " | guesses left: " + numGuesses);

    document.getElementById("numGuesses").innerHTML = guessesRemaining;
    document.getElementById("wordToGuess").innerHTML = blanksPlusCorrects.join(" ");
    document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");


    if(lettersInWord.toString() == blanksPlusCorrects.toLocaleString()){
        winCount++;
        alert("Congratulations, you've won this round!");

        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }
    else if (guessesRemaining == 0 ){
        lossCount++;
        alert("you've lost this round, please try again!");

        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();

    }
    
}

//=======
// Script
//=======

// initiates the code the first time
startGame();


// register keyclicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLocaleLowerCase();
    checkLetters(letterGuessed);
    roundComplete();


    // Testing/Debugging
    console.log(letterGuessed);
}