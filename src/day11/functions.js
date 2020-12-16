const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => parseInt(input));
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const part1 = (inputs) => {
  //pre-included difference device's built-in adapter and the highest adapter,
  //which is always 3
  let countThree = 1, countOne = 0; 

  /**
   * Array.sort()
   * The default sort order is ascending, 
   * built upon converting the elements into strings, 
   * then comparing their sequences of UTF-16 code units values.
   * 
  */
  inputs.sort((a, b) => {return a - b});
  inputs[0] - 0 === 1? countOne++ : countThree++;
  for(let i = 1; i < inputs.length; i++) {
    (inputs[i] - inputs[i - 1] === 1 )? countOne++ : countThree++;
  }

  return countOne * countThree;
}

const factorialCalculator = (n) => {
  if(n < 2) return 1;
  let i = 1; result = 1;
  while(i <= n) {
    result *=i;
    i++;
  }
  return result;
}

const combinationCalculator = (n, r) => {
  return factorialCalculator(n) / (factorialCalculator(r) * factorialCalculator(n-r));
}

/**
 * Description: calculate possible combinasons of a set of contiguous numbers 
 * with maximum difference less than given gap between any adjacent pair of numbers
 * 
 * @param {int} size - number of the elements in the set
 * @param {int} gap - difference between any adjacent pair of numbers
 * @returns {int} combCount
 */
const combinasonsMaxGap = (size, gap) => {
  let comb = 0;
  const upper = size - 2;
  if(upper < gap ) {
    // i number of selection
    for(let i  = 0; i <= upper; i++) {
      comb += combinationCalculator(upper, i)
    }
    return comb;
  }

  const lower = Math.ceil((size - 2)/gap);
  for(let i = upper; i >= lower; i--) {
    comb += combinationCalculator(upper, i)
  }
  for (let i = upper-3; i >= lower; i--) {
    comb -= combinationCalculator(upper-2, i)
  }
  return comb;
}

const part2 = (inputs) => {
  let arrangement = 1, contiguousOne = 0;
  //insert rating of charging outlet
  inputs.push(0); 
  inputs.sort((a, b) => { return a - b });
  //insert rating of device's built in adapter
  inputs.push(inputs[inputs.length-1] + 3);
  for (let i = 1; i < inputs.length; i++) {
    if (inputs[i] - inputs[i - 1] === 1) {
      contiguousOne++;
    } else {
      switch(contiguousOne) {
        case 0:
        case 1: break;
        case 2: 
          arrangement *= 2;
          break;
        default: 
          arrangement *= combinasonsMaxGap(contiguousOne+1, 3)
      }
      contiguousOne = 0;
    }
  }
  return arrangement;
}

module.exports = {
  readInput, 
  part1,
  factorialCalculator,
  combinationCalculator,
  combinasonsMaxGap,
  part2 }