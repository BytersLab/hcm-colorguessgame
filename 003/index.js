import {
  generateRandomColor,
  fillRoundColors,
  shuffle,
} from "./src/libs/tools.js";

generateRandomColor;

/* 
- Generate Random Colors
+ Pick one Color
- Show the Hex Code in the Code Area
- Show Colors in color-area. include the picked color
*/

let searchedColor = null;
searchedColor = generateRandomColor(); // This is searched color

const fillColors = fillRoundColors(11); // fill my array up
fillColors.push(searchedColor);

const mixedArray = shuffle(fillColors);

console.log(mixedArray);
