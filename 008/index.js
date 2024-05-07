import {
  prepareGame,
  colorsContainer,
  startGameBtn,
  colorBoxEvent,
  showScoring,
} from "./src/libs/tools.js";

showScoring();

startGameBtn.addEventListener("click", () => {
  prepareGame();
  colorsContainer.addEventListener("click", colorBoxEvent);
});
