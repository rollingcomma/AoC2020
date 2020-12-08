const fs = require('fs');

const readInput = (file) => {
  try {
    const inputs = fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => input.split(" "));
    return inputs;
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const part1 = (inputs) => {
  let count = 0;
  
  inputs.forEach(input => {
    const range = input[0].split("-");
    const target = input[1].charAt(0);
    let occurrences = 0;
    for (let i = 0; i < input[2].length; i++) {
      if (input[2][i] === target) occurrences++;
    }
    if (occurrences >= parseInt(range[0]) && occurrences <= parseInt(range[1]))
      count++;
  })
  return count;
}

const part2 = (inputs) => {
  let count = 0;

  inputs.forEach(input => {
    const range = input[0].split("-");
    const target = input[1].charAt(0);
    if (input[2].length >= parseInt(range[1]) 
        && (input[2].charAt([parseInt(range[0])-1]) === target 
            && input[2].charAt([parseInt(range[1])-1]) !== target)
        || (input[2].charAt([parseInt(range[1]) - 1]) === target
            && input[2].charAt([parseInt(range[0]) - 1]) !== target))
      count++;
  })
  return count;
}

module.exports = { readInput, part1, part2 };
