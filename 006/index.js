import {
  checkColors,
  setGame,
  searchedColor,
  prepareGame,
} from "./src/libs/tools.js";

const colorsContainer = document.querySelector(".colors-container");
const startGameBtn = document.querySelector(".toggle-btn");
const spanRounds = document.querySelector(".rounds");
const spanPoints = document.querySelector(".points");

let rounds = 0;
let points = 0;

startGameBtn.addEventListener("click", () => {
  prepareGame();

  spanRounds.innerText = 1;
  rounds = 1;

  function colorBoxEvent(event) {
    if (event.target.className !== "colorbox") {
      return;
    }
    const { hex } = event.target.dataset;
    const result = checkColors(searchedColor, hex);

    if (!result) {
      console.log("Leider Falsch");
      setGame("Start Game", "#d8dbe2", true);
      colorsContainer.removeEventListener("click", colorBoxEvent);
      // Scoreboard einfügen (Localstorage)
      rounds = 0;
      points = 0;
      spanRounds.innerText = rounds;
      spanPoints.innerText = points;
      return;
    }

    console.log(spanRounds.innerText);
    rounds += 1;
    points += 5;
    spanRounds.innerText = rounds;
    spanPoints.innerText = points;
    prepareGame();
    // Reset Timer
    console.log(result);
  }

  colorsContainer.addEventListener("click", colorBoxEvent);
});
