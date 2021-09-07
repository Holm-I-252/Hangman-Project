// Setting up variables
let theWord = [];
let blankWord = [];
let def = "";
let guess = "";
let tries = 10;
let tried = [];

// Begin the game
document.getElementById("getWord").addEventListener("click", () => {
  // Hit the api to get the word
  axios.get("https://random-words-api.vercel.app/word").then((res) => {
    // Set the api data to a array and splitting it
    word = res.data[0].word;
    lowerWord = word.toLowerCase();
    theWord = lowerWord.split("");

    // set the deffinition from the api
    def = res.data[0].definition;

    // copy the word array into an array of blanks to be filled in
    blankWord = [...theWord];

    for (let i = 0; i < blankWord.length; i++) {
      blankWord[i] = "_";
    }

    // add html elements for the game
    let wordSpace = document.getElementById("wordSpace");
    wordSpace.innerHTML = `<h3 id='blankWord'>${blankWord}</h3>`;

    let defSpace = document.getElementById("defSpace");
    defSpace.innerHTML = `<h3>Definition: ${def}</h3>`;

    let attempts = document.getElementById("attempts");
    attempts.innerHTML = `<h3>Attempted Letters:</h3>
    <div id="triedLetters"></div>
    <h3>Tries Left:</h3>
    <div id="triesLeft"></div>`;

    let triesLeft = document.getElementById("triesLeft");
    triesLeft.innerHTML = `<h3>${tries}</h3>`;

    let input = document.getElementById("letters");
    input.innerHTML = `<input type='radio' id="a" value="a" name='letter'></input>
    <label for="a">A</label>
    <input type='radio' id="b" value="b" name='letter'></input>
    <label for="b">B</label>
    <input type='radio' id="c" value="c" name='letter'></input>
    <label for="c">C</label>
    <input type='radio' id="d" value="d" name='letter'></input>
    <label for="d">D</label>
    <input type='radio' id="e" value="e" name='letter'></input>
    <label for="e">E</label>
    <input type='radio' id="f" value="f" name='letter'></input>
    <label for="f">F</label>
    <input type='radio' id="g" value="g" name='letter'></input>
    <label for="g">G</label>
    <input type='radio' id="h" value="h" name='letter'></input>
    <label for="h">H</label>
    <input type='radio' id="i" value="i" name='letter'></input>
    <label for="i">I</label>
    <input type='radio' id="j" value="j" name='letter'></input>
    <label for="j">J</label>
    <input type='radio' id="k" value="k" name='letter'></input>
    <label for="k">K</label>
    <input type='radio' id="l" value="l" name='letter'></input>
    <label for="l">L</label>
    <input type='radio' id="m" value="m" name='letter'></input>
    <label for="m">M</label>
    <input type='radio' id="n" value="n" name='letter'></input>
    <label for="n">N</label>
    <input type='radio' id="o" value="o" name='letter'></input>
    <label for="o">O</label>
    <input type='radio' id="p" value="p" name='letter'></input>
    <label for="p">P</label>
    <input type='radio' id="q" value="q" name='letter'></input>
    <label for="q">Q</label>
    <input type='radio' id="r" value="r" name='letter'></input>
    <label for="r">R</label>
    <input type='radio' id="s" value="s" name='letter'></input>
    <label for="s">S</label>
    <input type='radio' id="t" value="t" name='letter'></input>
    <label for="t">T</label>
    <input type='radio' id="u" value="u" name='letter'></input>
    <label for="u">U</label>
    <input type='radio' id="v" value="v" name='letter'></input>
    <label for="v">V</label>
    <input type='radio' id="w" value="w" name='letter'></input>
    <label for="w">W</label>
    <input type='radio' id="x" value="x" name='letter'></input>
    <label for="x">X</label>
    <input type='radio' id="y" value="y" name='letter'></input>
    <label for="y">Y</label>
    <input type='radio' id="z" value="z" name='letter'></input>
    <label for="z">Z</label>
    <input type='submit' id='letterSubmit'></input>`;

    let hint = document.getElementById("hint");
    hint.innerHTML = `<h3 id='hintWord' class='hidden'>${word}</h3>
    <button id='reveal'>Check Word</button>`;

    console.log(word);
  });
});

// event listener for the input
document.getElementById("letters").addEventListener("submit", (e) => {
  e.preventDefault();
  // set the input to a guess variable and settign it to lower case
  let input = "";
  function radioButton() {
    let ele = document.getElementsByName("letter");
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        input = ele[i].value;
        return input;
      }
    }
  }
  radioButton();
  guess = input.toLowerCase();

  //   document.getElementById("letterInput").value = "";
  console.log(guess);

  // see if the player guessed the word
  if (guess === theWord) {
    alert("You Win!");
    // see if the player has run out of tries
  } else if (tries <= 1) {
    alert("Game Over :(");
  } else {
    // see if the guess is in the word
    if (!theWord.includes(guess)) {
      // remove a try for an incorrect guess
      tries--;
      console.log(tries);
      let triesLeft = document.getElementById("triesLeft");
      triesLeft.innerHTML = `<h3>${tries}</h3>`;
    }
    // fill in any blanks that correspond to a guess
    for (let i = 0; i < theWord.length; i++) {
      if (theWord[i] === guess) {
        blankWord[i] = guess;
      }
    }
    console.log(blankWord);
    let wordSpace = document.getElementById("wordSpace");
    wordSpace.innerHTML = `<h3 id='blankWord'>${blankWord}</h3>`;

    // if a letter has been guessed, display it to the player
    if (!tried.includes(guess)) {
      tried.push(guess);
      let triedletters = document.getElementById("triedLetters");
      triedletters.innerHTML = `<h3>${tried}</h3>`;
    }
    // if there are no more blanks, the player wins
    if (!blankWord.includes("_")) {
      alert("You Win!");
    }
  }
});

document.getElementById("reveal").addEventListener("click", () => {
  let element = document.getElementById("hintWord");
  element.classList.toggle("visible");
  console.log("click");
});
