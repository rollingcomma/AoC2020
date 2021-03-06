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
 * Algorithms
 * 
 * ##########################################################################################################
 * assume:
 *  i - the start of a subset of contiguous ascending numbers
 *  k - the end of a subset of contiguous ascending numbers
 *
 * ...,i-3, i, i+1, i+2, i+3,..., k, k+3,...
 * 
 * Total number of subset is (k-i+1)
 * i and k have to be in the arrangement in order to be valid,
 * The maximum number can be selected (maxNumSelected) in the combinason is (k-i+1 - 2) - total minus both sides
 * The minimum number has to be selected (minNumSelected) in the combinason is ((size - 2)/gap) round to ceil - limited by the gap
 * 
 * The total combinason is C(maxNumSelected, i), i from maxNumSelected to minNumSelected desc
 * The invalid combinason contains at least a pair numbers with difference larger than gap
 * - at least  numbers removed between the pair, consider the removed group as one (3-1)
 *  i, i+1, (i+2, i+3, i+4), i+5, ..., k, 
 * The total invalid combinason is C(maxNumSelected - 2, i), i from (maxNumSelected - gap) to minNumSelected desc
 *
 * ##########################################################################################################
 *
 * @param {int} size - number of the elements in the set
 * @param {int} gap - difference between any adjacent pair of numbers
 * @returns {int} comb
 * 
 */
const combinasonsMaxGap = (size, gap) => {
  let comb = 0;
  const maxNumSelected = size - 2;
  //The maximum number can be selected in the combinason is less than gap, 
  //all combinasons are valid, calculate all possible combinasons
  if (maxNumSelected < gap ) {
    // i number of selection
    for (let i = 0; i <= maxNumSelected; i++) {
      comb += combinationCalculator(maxNumSelected, i)
    }
    return comb;
  }

  //The maximum number can be selected in the combinason is larger than gap
  //calculate the minimum number has to be selected
  const minNumSelected = Math.ceil((size - 2)/gap);
  //all combinasons included invalid
  for (let i = maxNumSelected; i >= minNumSelected; i--) {
    comb += combinationCalculator(maxNumSelected, i)
  }
  //minus all invalid combinasons
  for (let i = maxNumSelected - gap; i >= minNumSelected; i--) {
    comb -= combinationCalculator(maxNumSelected-2, i)
  }
  return comb;
}

/**
 * Description:
 * Algorithms 
 * There is only 1 arrangement (selection) for any number of adjacent numbers with difference of 3 (max gap)
 * so only consider adjacent numbers with difference of 1 - contiguous ascending subset numbers in the inputs
 *  
 * @param {array} inputs 
 * @returns {int} arrangement
 * 
 */
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