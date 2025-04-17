const gameBoardElement = document.getElementById("gameBoard");
const formElement = document.getElementById("form");
const errorTextElement = document.getElementById("error-message");
const typeZoneElement = document.getElementById("typeZone");

const ALL_WORDS = [
  "zara",
  "pelo",
  "humo",
  "chasqueador",
  "zombie",
  "atropello",
  "ticket",
  "infectado",
  "hambre",
  "accidente",
  "vitrina",
  "apocalipsis",
  "supervivencia",
  "sangre",
  "hongo",
  "cordyceps",
];

let randomWord = "";
const tries = 5;
let actualRow = 0;

//1 Seleccionar palabra aleatoria
const randomWordToGuess = () => {
  randomWord = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
  console.log("palabra elegida " + randomWord);
  return randomWord;
};

//2. Crear el tablero: primero esta el padre(el game-board),luego el hijo(game-board-row) y de esos esta el hijo del hijo que es tile(va dendro de game-board-row)
const createBoard = () => {
  const letters = randomWord.split("");

  for (let i = 0; i < tries; i++) {
    const fragment = document.createDocumentFragment();
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    //usar J
    letters.forEach(letter => {
      const letterElement = document.createElement("span");
      letterElement.classList.add("tile");
      rowElement.append(letterElement);
    });

    gameBoardElement.append(rowElement);
  }

};

const tilesChangeColor = () => {
  //gameBoardElement.children[1].children[actualRow].children; // es un array, se tiene que crear un bucle del nieto (ultimo hijo)

  let wordToCheck = randomWord; // es mejor crear una funcion que no sobre escriba la palabra a adivinar proeque luego no se puede realizar el juego

//El primer blucle revisa si esta correcto 
  for(let i=0; i < randomWord.length; i++){
    const inputLetter = typeZoneElement.value[i];
    const correctLetter = randomWord[i];
    const tile = gameBoardElement.children[actualRow].children[i];

    if(typeZoneElement.value[i] === randomWord[i]){
    gameBoardElement.children[actualRow].children[i].classList.add("tile-correct"); // cambia a verde
    wordToCheck = wordToCheck.replace(wordToCheck[i],"🔪") // lo sustituimos por cualquier elemento que no sea una letra
    }
  }
  //segundo bucle para el amarillo(la letra esta pero en el lugar incorrecto) y para cuando no esta la letra (gris)
  for (let i = 0; i < randomWord.length; i++) {
    const inputLetter = typeZoneElement.value[i];
    const tile = gameBoardElement.children[actualRow].children[i];

    if (!tile.classList.contains("tile-correct")) {
      if (wordToCheck.includes(inputLetter)) {
        tile.classList.add("tile-present"); // Amarillo
        wordToCheck = wordToCheck.replace(inputLetter, "🔪");
       // console.log("wordToCheck con el reemplazo:", wordToCheck);
      } else {
        tile.classList.add("tile-incorrect"); // Gris
      }
    }
    tile.textContent = inputLetter; 
  }
};

//6. Ganar o perder //text content errorTextElement con You WIN, You LOSE
const youWinOrLose = () => {
  if (typeZoneElement.value === randomWord) {
    errorTextElement.classList.remove('hide');
    errorTextElement.classList.remove('error-text');
    typeZoneElement.classList.add("hide")
    errorTextElement.classList.add('win');

    errorTextElement.textContent = "You Win!";
  } else if (actualRow === tries -1) {
    errorTextElement.classList.remove('hide');
    errorTextElement.classList.remove('win');
    typeZoneElement.classList.add("hide")
    errorTextElement.textContent = "You Lose, the word was " + randomWord;
  }
}

// Recoger el valor del input
//4. Pintar lo q habéis escrito en el tablero, cada letra en el cuadradito
const inputTypedText = () => {
  event.preventDefault();

  if (typeZoneElement.value.length !== randomWord.length) {
    errorTextElement.classList.remove("hide");
    errorTextElement.classList.remove("win");
    errorTextElement.textContent = `The word doesn't have ${randomWord.length} characters`;
  } else {
    errorTextElement.classList.add("hide");
    const rows = document.querySelectorAll(".row")[actualRow]; // El padre. Me aseguro que comienza por la primera fila
    const tiles = rows.querySelectorAll(".tile"); // selecciono los hijos que estan dentro del padre
    for (let i = 0; i < randomWord.length; i++) {
      tiles[i].textContent = typeZoneElement.value[i];
    }
  }
  tilesChangeColor();
  youWinOrLose()
  actualRow++;

  event.target.reset();
};

randomWordToGuess();
createBoard();

formElement.addEventListener("submit", inputTypedText);
