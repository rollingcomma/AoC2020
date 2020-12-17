const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => input.split(""));
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

/**
 * 
 * @param {2D array} inputs 
 * @param {int} row 
 * @param {int} col 
 * 
 * ###############################################
 * [row-1][col-1] [row-1][col] [row-1][col+1]
 *  [row][col-1]  ([row][col])  [row][col+1]
 * [row+1][col-1] [row+1][col] [row+1][col+1]
 * ###############################################
 */
const adjacentOccupiedCount = (inputs, row, col) => {
  let count = 0;
  if (col > 0 && row > 0 && inputs[row - 1][col - 1] === "#") count++;
  if (row > 0 && inputs[row - 1][col] === "#") count++;
  if (row > 0 && col < (inputs[row].length - 1) && inputs[row - 1][col + 1] === "#") count++;


  if (col > 0 && inputs[row][col - 1] === "#") count++;
  if (col < (inputs[row].length - 1) && inputs[row][col + 1] === "#") count++;
  
  if (col > 0 && row < (inputs.length - 1) && inputs[row + 1][col - 1] === "#") count++;
  if (row < (inputs.length - 1) && inputs[row + 1][col] === "#") count++;
  if (row < (inputs.length - 1) && col < (inputs[row].length - 1) && inputs[row + 1][col + 1] === "#") count++;
  return count;
}

/**
 *
 * @param {2D array} inputs
 * @param {int} row
 * @param {int} col
 *
 * ###############################################
 * nw n ne
 * w  _  e
 * sw s se
 * ###############################################
 */
const firstSeatOccupiedCount = (inputs, row, col) => {
  let countDirection = {}, i = 1;
  let maxRadius = Math.max(row, col, inputs.length-row, inputs.length-col);
  
  while (i <= maxRadius) {
    if (!countDirection["nw"] && (col - i) >= 0 && (row - i) >= 0 && inputs[row - i][col - i] !== ".") countDirection["nw"] = inputs[row - i][col - i];
    if (!countDirection["n"] && (row - i) >= 0 && inputs[row - i][col] !== ".") countDirection["n"] = inputs[row - i][col];
    if (!countDirection["ne"] && (row - i) >= 0 && (col + i) < inputs[row].length && inputs[row - i][col + i] !== ".") countDirection["ne"] = inputs[row - i][col + i];


    if (!countDirection["w"] && (col - i) >= 0 && inputs[row][col - i] !== ".") countDirection["w"] = inputs[row][col - i];
    if (!countDirection["e"] && (col + i) < inputs[row].length && inputs[row][col + i] !== ".") countDirection["e"] = inputs[row][col + i];

    if (!countDirection["sw"] && (col - i) >= 0 && (row + i) < inputs.length && inputs[row + i][col - i] !== ".") countDirection["sw"] = inputs[row + i][col - i];
    if (!countDirection["s"] && (row + i) < inputs.length && inputs[row + i][col] !== ".") countDirection["s"] = inputs[row + i][col];
    if (!countDirection["se"] && (row + i) < inputs.length && (col + i) < inputs[row].length && inputs[row + i][col + i] !== ".") countDirection["se"] = inputs[row + i][col + i];
    i++;
  }
  let count = 0;
  Object.values(countDirection).forEach(value => {if(value === "#") count++});
  return count;
}

const occupiedCount = (inputs) => {
  let count = 0;
  for (let row = 0; row < inputs.length; row++) {
    for (let col = 0; col < inputs[row].length; col++) {
      if(inputs[row][col] === "#") count++;
    }
  }
  return count;
}

const simulateSeating = (inputs, countFunc, occupiedNum) => {
  let outputs = JSON.parse(JSON.stringify(inputs));
  let stateChange, previous;
  
  do {
    previous = JSON.parse(JSON.stringify(outputs));
    stateChange = false;
    for (let row = 0; row < previous.length; row++) {
      for (let col = 0; col < previous[row].length; col++) {
        if (previous[row][col] === "L" && countFunc(previous, row, col) === 0) {
          outputs[row][col] = "#";
          stateChange = true;
        } else if (previous[row][col] === "#" && countFunc(previous, row, col) > occupiedNum ) {
          outputs[row][col] = "L";
          stateChange = true;
        }
      }
    }
  } while (stateChange);
  return outputs;
}

const part1 = (inputs) => {
  const newInputs = simulateSeating(inputs, adjacentOccupiedCount, 3);
  return occupiedCount(newInputs);
}


const part2 = (inputs) => {
  const newInputs = simulateSeating(inputs, firstSeatOccupiedCount, 4);
  return occupiedCount(newInputs);
}

module.exports = {
  readInput, 
  simulateSeating,
  adjacentOccupiedCount,
  firstSeatOccupiedCount,
  part1,
  part2 }