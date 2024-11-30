const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango',
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
  constructor(word) {
    this.word = word;
    this.displayWord = word.replaceAll(/[\w]/g, "_");
    this.remainingGuesses = 10;
    this.incorrectLetters = [];
    this.correctLetters = [];
  }

  // Method to handle a guessed letter
  guessLetter(letter) {
    // Prevent duplicate guesses
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)) {
      return;
    }

    if (this.word.includes(letter)) {
      // Add to correct letters and update the display word
      this.correctLetters.push(letter);
      this.displayWord = this.word
        .split("")
        .map((char) => (this.correctLetters.includes(char) ? char : "_"))
        .join("");
    } else {
      // Add to incorrect letters and decrement remaining guesses
      this.incorrectLetters.push(letter);
      this.remainingGuesses--;
    }
  }

  // Method to update the HTML display
  updateScreen() {
    document.getElementById("remaining-guesses").textContent = this.remainingGuesses;
    document.getElementById("incorrect-letters").textContent = this.incorrectLetters.join(", ");
    document.getElementById("word-to-guess").textContent = this.displayWord;
  }

  // Method to check if the game is over
  isGameOver() {
    return this.remainingGuesses <= 0 || this.word === this.displayWord;
  }

  // Method to determine if the player won or lost
  getWinOrLoss() {
    if (this.word === this.displayWord && this.remainingGuesses > 0) {
      return "win";
    } else if (this.remainingGuesses <= 0) {
      return "loss";
    }
    return null;
  }
}

// Start a new game
function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  currentWord = new Word(randomWord);
  currentWord.updateScreen();
}

document.onkeyup = function (e) {
  const pressedKey = e.key.toLowerCase();
  // Early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return;

  // Pass in guessed letter to word object
  currentWord.guessLetter(pressedKey);
  // Allow word object to update screen
  currentWord.updateScreen();

  // Check if game is over
  const gameOver = currentWord.isGameOver();

  // If game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById("previous-word");
    const winDisplay = document.getElementById("wins");
    const lossDisplay = document.getElementById("losses");
    previousWord.textContent = currentWord.word;
    const result = currentWord.getWinOrLoss();
    if (result === "win") {
      wins++;
      winDisplay.textContent = wins;
    } else if (result === "loss") {
      losses++;
      lossDisplay.textContent = losses;
    }
    newGame();
  }
};

// Initialize the first game
newGame();
