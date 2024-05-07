import { startGameBtn, showScoring, toggleGame } from "./src/libs/tools.js";

showScoring();

startGameBtn.addEventListener("click", toggleGame);
