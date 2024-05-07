import {
  generateRandomColor,
  fillRoundColors,
  shuffle,
  checkColors,
  setGame,
} from "./src/libs/tools.js";

const hexcode = document.querySelector("#hexcode");
const colorsContainer = document.querySelector(".colors-container");
const colorboxes = document.querySelectorAll(".colorbox");
const startGameBtn = document.querySelector(".toggle-btn");
const spanRounds = document.querySelector(".rounds");
const spanPoints = document.querySelector(".points");

let searchedColor = null;
let fillColors = [];
let mixedArray = [];
let rounds = 0;
let points = 0;

startGameBtn.addEventListener("click", () => {
  searchedColor = generateRandomColor(); // This is searched color
  fillColors = fillRoundColors(11); // fill my array up
  fillColors.push(searchedColor);
  mixedArray = shuffle(fillColors);
  spanRounds.innerText = 1;
  rounds = 1;

  setGame(searchedColor, mixedArray, colorboxes, hexcode);

  function colorBoxEvent(event) {
    if (event.target.className !== "colorbox") {
      return;
    }
    const { hex } = event.target.dataset;
    const result = checkColors(searchedColor, hex);

    if (!result) {
      console.log("Leider Falsch");
      setGame("Start Game", [], colorboxes, hexcode);
      colorsContainer.removeEventListener("click", colorBoxEvent);
      // Scoreboard einfügen (Localstorage)
      rounds = 0;
      points = 0;
      spanRounds.innerText = rounds;
      spanPoints.innerText = points;

      // Reset Points
      // Reset Timer
      // Add Score to Scoreboard
      return;
    }

    console.log(spanRounds.innerText);
    rounds += 1;
    points += 5;
    spanRounds.innerText = rounds;
    spanPoints.innerText = points;

    // Add 1 to Round
    // Add Points
    // Set new Code
    // set new Colors
    // Reset Timer
    console.log(result);
  }

  colorsContainer.addEventListener("click", colorBoxEvent);
});
