const fs = require('fs');

const readInput = (file) => {
  try {
    const inputs = fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n");
    return inputs;
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const part1 = (inputs, right, down) => {
  let count = 0;
  let index = 0;
  for(let i = 0; i < inputs.length; i += down) {
  if(inputs[i].charAt(index) === "#") {
      count++;
    }
    index += right;
    //if index is larger than number of character in each line, reset index to the offset
    if(index > inputs[i].length - 1) {
      index = index - inputs[i].length;
    }
    
  }
  return count
}

const part2 = (inputs, right, down) => {
  let count = 0;
  let index = 0;
  for (let i = 0; i < inputs.length; i += down) {
    if (input[i].charAt(index) === "#") {
      count++;
    }
    index += right;
    //if index is larger than number of character in each line, reset index to the offset
    if (index > input.length - 1) {
      index = index - input.length;
    }

  }
  return count
}

module.exports = { readInput, part1, part2 };