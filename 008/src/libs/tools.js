export const colorboxes = document.querySelectorAll(".colorbox");
export const hexcode = document.querySelector("#hexcode");
const countdown = document.querySelector(".countdown");

export const colorsContainer = document.querySelector(".colors-container");
export const startGameBtn = document.querySelector(".toggle-btn");
export const spanRounds = document.querySelector(".rounds");
export const spanPoints = document.querySelector(".points");
export const scoreContainer = document.querySelector("#score-container");

export let searchedColor = null;
export let fillColors = [];
export let mixedArray = [];

let interval;
let rounds = 1;
let points = 0;

export function prepareGame() {
  searchedColor = generateRandomColor(); // This is searched color
  fillColors = fillRoundColors(11); // fill my array up
  fillColors.push(searchedColor);
  mixedArray = shuffle(fillColors);
  spanRounds.innerText = rounds;
  setGame();
}

export function resetStats() {
  setGame("Start Game", "#d8dbe2", true, false);
  colorsContainer.removeEventListener("click", colorBoxEvent);
  rounds = 0;
  points = 0;
  spanRounds.innerText = rounds;
  spanPoints.innerText = points;
}

export function updateStats() {
  rounds += 1;
  points += 5;
  spanRounds.innerText = rounds;
  spanPoints.innerText = points;
}

export function generateRandomColor() {
  let hexCode = "#";
  const chars = "0123456789ABCDEF";

  for (let i = 0; i < 6; i++) {
    let randIndex = Math.floor(Math.random() * 16);
    hexCode += chars[randIndex];
  }
  return hexCode;
}

export function fillRoundColors(amount) {
  const array = [];
  for (let i = 0; i < amount; i++) {
    let hexcode = generateRandomColor();
    array.push(hexcode);
  }
  return array;
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const rndIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[rndIndex]] = [array[rndIndex], array[i]];
  }

  console.log(array);
  return array;
}

export function checkColors(hex1, hex2) {
  if (hex1 === hex2) {
    return true;
  } else {
    return false;
  }
}

function startCountdown(seconds) {
  let timer = seconds;
  interval = setInterval(() => {
    timer -= 1;
    let displaySeconds = timer < 10 ? "0" + timer : timer;
    countdown.innerText = "00:" + displaySeconds;
    if (timer <= 0) {
      updateScoring();
      showScoring();
      clearInterval(interval);
      // Scoreboard
      resetStats();
    }
  }, 1000);
}

export function setGame(innerText, colorcode, renew, needCountdown = true) {
  if (renew === true) {
    searchedColor = generateRandomColor();
  }

  hexcode.innerText = innerText || searchedColor;
  colorboxes.forEach((element, index) => {
    element.style.backgroundColor = colorcode || mixedArray[index];
    element.dataset.hex = mixedArray[index];
  });

  clearInterval(interval);
  if (needCountdown) {
    startCountdown(30);
    return;
  }
  countdown.innerText = "00:00";
}

function updateScoring() {
  const scores = localStorage.getItem("scores");

  if (!points <= 0) {
    if (scores === null) {
      localStorage.setItem("scores", [points]);
    } else {
      const scoresArray = scores.split(",");

      if (!scoresArray.includes(points.toString())) {
        scoresArray.push(points);
      }

      localStorage.setItem("scores", scoresArray);
    }
  }
}

export function showScoring() {
  const savedScores = localStorage.getItem("scores");
  const savedScoresArray = savedScores ? savedScores.split(",") : [];

  scoreContainer.innerHTML = "";

  savedScoresArray.forEach((element) => {
    const h5 = document.createElement("h5");
    h5.innerText = element;
    scoreContainer.appendChild(h5);
  });
}

export function colorBoxEvent(event) {
  if (event.target.className !== "colorbox") {
    return;
  }
  const { hex } = event.target.dataset;
  const result = checkColors(searchedColor, hex);

  // User missclicked
  if (!result) {
    // Scoreboard einfügen (Localstorage)
    updateScoring();
    showScoring();
    resetStats(colorBoxEvent);
    return;
  }

  updateStats();
  prepareGame();
}
