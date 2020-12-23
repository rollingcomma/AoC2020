const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => input.split(",").map(num => parseInt(num))
      );
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

/**
 * Note: the executing time for part 2 range = 30000000 takes 630s
 * Optimization is needed
 * 
 * @param {array} inputs 
 * @param {int} range 
 */
const part1 = (inputs, range) => {
  range -= 1;
  let spokenHashTable = {};
  //initialize hashtable
  inputs.forEach((num, i) => {
    spokenHashTable[num] = [i+1];
  })
  let previousSpokenNum = 0;
  for(let i = inputs.length; i < range; i++) {
    if (spokenHashTable[previousSpokenNum]) {
      spokenHashTable[previousSpokenNum].push(i + 1);
      const length = spokenHashTable[previousSpokenNum].length;
      previousSpokenNum = (i + 1 - spokenHashTable[previousSpokenNum][length - 2])
    } else {
      spokenHashTable[previousSpokenNum] = [i + 1];
      previousSpokenNum = 0;
    }
  }
  return previousSpokenNum;
}

module.exports = {
  readInput, 
  part1, 
  part2 }