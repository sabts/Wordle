const gameBoardElement = document.getElementById('gameBoard');
const formElement = document.getElementById('form')
const errorTextElement = document.getElementById('error-message')
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
let actualRow = 0;

//1 Seleccionar palabra aleatoria
const randomWordToGuess = () => {
  randomWord = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
  console.log('palabra elegida ' + randomWord);
  return randomWord;
};

//2. Crear el tablero: primero esta el padre(el game-board),luego el hijo(game-board-row) y de esos esta el hijo del hijo que es tile(va dendro de game-board-row)
const createBoard = () => {
  const letters = randomWord.split('');

  for (let i = 0; i < 6; i++) {
    const fragment = document.createDocumentFragment();
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    letters.forEach(letter => {
      const letterElement = document.createElement('span');
      letterElement.classList.add('tile');
      rowElement.append(letterElement);
    });

    gameBoardElement.append(rowElement);
  }
};
randomWordToGuess();
createBoard();  

//3.Recoger el valor del input
const InputTypedText = () => {
  event.preventDefault()

if(typeZoneElement.value.length !== randomWord.length){
  errorTextElement.classList.remove('hide')
  errorTextElement.textContent = `The word doesn't have ${randomWord.length} characters`
} else {
  errorTextElement.classList.add('hide')
  gameBoardElement.textContent = typeZoneElement.value; 
}
};

//4. Pintar lo q habéis escrito en el tablero, cada letra en el cuadradito
//5. Color de los cuadrados 
//6. Ganar o perder

formElement.addEventListener('submit',InputTypedText)