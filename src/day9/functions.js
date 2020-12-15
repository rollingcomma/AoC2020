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

const part1 = (inputs, num) => {
  let previous = {};
  for (let i = 0; i < num; i++) {
    previous = { ...previous, ...{ [inputs[i]]: i } }
  }
  for (let i = num; i < inputs.length; i++) {
    let isValid = false;
    for (const prop in previous) {
      if (previous[inputs[i] - prop]) {
        isValid = true;
        break;
      }
    }
    if (!isValid) return inputs[i];
    delete previous[inputs[i - num]];
    previous = { ...previous, ...{ [inputs[i]]: i } }
  }
}

const part2 = (inputs, num) => {
  const number = part1(inputs, num);
  let sum = 0, set = [];
  for(let i = 0; i < inputs.length; i++) {
    sum += inputs[i];
    set.push(inputs[i]);
    if( sum < number) {
      continue;
    } else if(sum === number) {
      return Math.max(...set) + Math.min(...set);
    } else {
      do {
        const remove = set.shift();
        sum = sum - remove;
      } while(sum > number);
      if (sum === number) {
        return (Math.max(...set) + Math.min(...set));
      }
    }
  }
}

module.exports = {
  readInput, 
  part1, 
  part2 }