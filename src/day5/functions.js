const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => {
        //input is binary, F or L refers to 0, B or R refers to 1 
        const tmp = input.replace(/[FL]/g, "0").replace(/[BR]/g, "1");
        const row = tmp.substring(0,7);
        const seat = tmp.substring(7);
        return [parseInt(row, 2), parseInt(seat, 2)]; 
      });
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const part1 = (inputs) => {
  let maxSeatNum = 0;
  inputs.forEach(input => {
    const temp = input[0] * 8 + input[1]
    if( temp > maxSeatNum) maxSeatNum = temp;
  })
  return maxSeatNum;
}

/**
 * Algorithm:
 * Calculate the sum of first n natural numbers as sumtotal= n*(n+1)/2
 * Create a variable sum to store the sum of array elements.
 * Traverse the array from start to end.
 * Update the value of sum as sum = sum + array[i]
 * Return the missing number as sumtotal – sum
 * 
 * @param {*} arr 
 * @return {int} num
 */
const findMissingNum = (arr, n) => {
  const sum = n * (n + 1) /2;
  let total = 0;
  arr.forEach(num=> total += num);
  return sum-total;
}

const part2 = (inputs) => {
  let flight = {};
  inputs.forEach(input => {
    if(flight[input[0]]) {
      //if the row is full, remove the row
      if(flight[input[0]].length === 7) {
        delete flight[input[0]]
      } else {
        flight[input[0]].push(input[1]);
      }
    } else {
      flight[input[0]] = [input[1]];
    }
  })
  let missingID;
  for (const [key, value] of Object.entries(flight)) {
    if(value.length === 7) {
      const row = parseInt(key);
      const colum = findMissingNum(value, 7);
      missingID = row * 8 + colum;
    }
  }
  return missingID;
} 


module.exports = {
  readInput, 
  part1, 
  part2 }