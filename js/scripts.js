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
const tries = 6;
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

//3.Recoger el valor del input
//4. Pintar lo q habéis escrito en el tablero, cada letra en el cuadradito
const InputTypedText = () => {
  event.preventDefault();

  if (typeZoneElement.value.length !== randomWord.length) {
    errorTextElement.classList.remove("hide");
    errorTextElement.textContent = `The word doesn't have ${randomWord.length} characters`;
  } else {
    errorTextElement.classList.add("hide");
    const rows = document.querySelectorAll(".row")[actualRow]; // El padre. Me aseguro que comienza por la primera fila
    const tiles = rows.querySelectorAll(".tile"); // selecciono los hijos que estan dentro del padre
    for (let i = 0; i < randomWord.length; i++) {
      tiles[i].textContent = typeZoneElement.value[i];
    }
    actualRow++;
  }
  event.target.reset();
};
//5. Color de los cuadrados
//El primer blucle revisa si esta correcto
//segundo bucle para el amarillo(la letra esta pero en el lugar incorrecto)
//el ultimo bulcle No esta (gris)
const tilesChangeColor = () => {
  //const tiles = gameBoardElement.children[1].children[actualRow].children; // es un array, se tiene que crear un bucle del nieto (ultimo hijo)

  const lettersInBoard = randomWord;
  console.log("palabra del board: " + lettersInBoard);

  for (const typeZoneElement of randomWord) {
    
  }
  }

  for (let j = 0; 0 < typeZoneElement.value; j++) {
    const typeWord = typeZoneElement.textContent[i];

    if (selectedWord !== typeWord) {
      tiles.classList.add("tile-incorrect");
    }
  }
};
//clases:
//  tiles[i].classList.add("tile-correct"); Verde
//  tiles[i].classList.add("tile-present"); Amarillo
//   tiles[i].classList.add("tile-incorrect"); Gris

//6. Ganar o perder //text content errorTextElement con You WIN, You LOSE

randomWordToGuess();
createBoard();
tilesChangeColor();

formElement.addEventListener("submit", InputTypedText);
formElement.addEventListener("submit", tilesChangeColor);
