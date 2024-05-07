export let colorboxes = document.querySelectorAll(".colorbox");
export const hexcode = document.querySelector("#hexcode");
const countdown = document.querySelector(".countdown");

export const colorsContainer = document.querySelector(".colors-container");
export const startGameBtn = document.querySelector(".toggle-btn");
export const spanRounds = document.querySelector(".rounds");
export const spanPoints = document.querySelector(".points");
export const scoreContainer = document.querySelector("#score-container");
export const modusBtnContainer = document.querySelector(".modus-btn-container");

export let searchedColor = null;
export let fillColors = [];
export let mixedArray = [];

let interval;
let rounds = 1;
let points = 0;
let modus = 2;
let time = 20;

modusBtnContainer.addEventListener("click", (event) => {
  if (event.target.className === "modus-btn") {
    resetStats();
    startGameBtn.classList.remove("stop");
    startGameBtn.innerText = "Start Game";
    modus = Number(event.target.dataset.modus);
    switch (modus) {
      case 2:
        time = 20;
        break;
      case 5:
        time = 15;
        break;
      case 11:
        time = 10;
        break;
    }
    colorsContainer.innerHTML = "";

    for (let i = 0; i <= modus; i++) {
      const box = document.createElement("div");
      box.classList.add("colorbox");
      colorsContainer.appendChild(box);
    }
    colorboxes = document.querySelectorAll(".colorbox");
    colorsContainer.addEventListener("click", colorBoxEvent);
  }
});

// Functions for Setting the Game6

export function prepareGame() {
  searchedColor = generateRandomColor(); // This is searched color
  fillColors = fillRoundColors(modus); // fill my array up
  fillColors.push(searchedColor);
  mixedArray = shuffle(fillColors);
  spanRounds.innerText = rounds;
  setGame();
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
    startCountdown(time);
    return;
  }
  countdown.innerText = "00:00";
}

// Functions for Setting Colors

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

  return array;
}

// Functions for Scoring

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

  const newArray = savedScoresArray.map((element) => {
    return Number(element);
  });

  newArray.sort((a, b) => {
    return b - a;
  });

  newArray.forEach((element) => {
    const h5 = document.createElement("h5");
    h5.innerText = element.toString();
    scoreContainer.appendChild(h5);
  });
}

// Functions for handling stats

export function resetStats() {
  setGame("Start Game", "#373f51", true, false);
  colorsContainer.removeEventListener("click", colorBoxEvent);
  rounds = 0;
  points = 0;
  spanRounds.innerText = rounds;
  spanPoints.innerText = points;
}

export function updateStats() {
  rounds += 1;
  switch (modus) {
    case 2:
      points += 2;
      break;
    case 5:
      points += 4;
      break;
    case 11:
      points += 6;
      break;
  }

  spanRounds.innerText = rounds;
  spanPoints.innerText = points;
}

// Helpers

function startCountdown(seconds) {
  let timer = seconds;
  interval = setInterval(() => {
    timer -= 1;
    let displaySeconds = timer < 10 ? "0" + timer : timer;
    countdown.innerText = "00:" + displaySeconds;
    if (timer <= 0) {
      startGameBtn.classList.remove("stop");
      startGameBtn.innerText = "Start Game";
      updateScoring();
      showScoring();
      clearInterval(interval);
      resetStats();
    }
  }, 1000);
}

export function checkColors(hex1, hex2) {
  if (hex1 === hex2) {
    return true;
  } else {
    return false;
  }
}

// Eventhandler for Eventlistener

export function colorBoxEvent(event) {
  if (event.target.className !== "colorbox") {
    return;
  }
  const { hex } = event.target.dataset;
  const result = checkColors(searchedColor, hex);

  // User missclicked
  if (!result) {
    // Scoreboard einfügen (Localstorage)
    startGameBtn.classList.remove("stop");
    startGameBtn.innerText = "Start Game";
    updateScoring();
    showScoring();
    resetStats(colorBoxEvent);
    return;
  }

  updateStats();
  prepareGame();
}

export function toggleGame(event) {
  if (event.target.classList.contains("stop")) {
    event.target.classList.toggle("stop");
    event.target.innerText = "Start Game";

    clearInterval(interval);
    updateScoring();
    showScoring();
    resetStats();
  } else {
    event.target.classList.toggle("stop");
    event.target.innerText = "Stop Game";
    prepareGame();
    colorsContainer.addEventListener("click", colorBoxEvent);
  }
}
