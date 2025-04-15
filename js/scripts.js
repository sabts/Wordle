const formElement = document.getElementById("form");
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

//1
const randomWordToGuess = () => {
  const randomWord = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];

  console.log(randomWord);
};

randomWordToGuess();

//2
const wordtoGuessInboard = () => {
  randomWordToGuess();

  const fragment = document.createDocumentFragment();
};
