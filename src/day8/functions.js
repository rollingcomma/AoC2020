const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => [input.substring(0,3), parseInt(input.substring(3))]);
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const executeProgram = (inputs) => {
  let executedInstruction = {};
  let acc = 0, i = 0;

  while (i < inputs.length) {
    if (executedInstruction[i]) return { loop: acc };
    executedInstruction = { ...executedInstruction, ...{ [i]: inputs[i] } };
    switch (inputs[i][0]) {
      case "acc": {
        acc += inputs[i][1];
        i++;
        break;
      }
      case "jmp": {
        i += inputs[i][1];
        break;
      }
      case "nop": {
        i++;
        break;
      }
    }
  }
  return { exit: acc };
}

const part1 = (inputs) => {
  return executeProgram([...inputs]).loop;
}

const part2 = (inputs) => {
  let j = inputs.length - 1;
  while (j >= 0) {
    //deep copy nested array, only applicable to array or object with primitive type value
    let newInputs = JSON.parse(JSON.stringify(inputs));
    if (newInputs[j][0] === "jmp" ) {
      newInputs[j][0] = "nop";
    } else if (newInputs[j][0] === "nop" && newInputs[j][1] !== 0) {
      newInputs[j][0] = "jmp";
    } else {
      j--; 
      continue;
    } 
    
    const result = executeProgram(newInputs)
    if (result.exit) return result.exit;
    j--;
    continue;
  } 
}

module.exports = {
  readInput, 
  part1, 
  part2 }