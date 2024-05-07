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
let searchedColor = null;
let fillColors = [];
let mixedArray = [];
const startGameBtn = document.querySelector(".toggle-btn");

startGameBtn.addEventListener("click", () => {
  searchedColor = generateRandomColor(); // This is searched color
  fillColors = fillRoundColors(11); // fill my array up
  fillColors.push(searchedColor);
  mixedArray = shuffle(fillColors);
  setGame(searchedColor, mixedArray, colorboxes, hexcode);

  colorsContainer.addEventListener("click", (event) => {
    if (event.target.className !== "colorbox") {
      return;
    }
    const { hex } = event.target.dataset;
    const result = checkColors(searchedColor, hex);

    if (!result) {
      console.log("Leider Falsch");
      // Stop Game
      // Reset Code
      // Reset Points
      // Ende Game
      return;
    }

    // Add 1 to Round
    // Add Points
    // Set new Code
    // set new Colors
    // Reset Timer

    console.log(result);
  });
});
