const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split(/\n{2}/);
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const part1 = (inputs) => {
  let count = 0;
  const newInputs = inputs.map(input => input.replace(/\n/g, ''));
  newInputs.forEach(input => {
    let temp = {};
    for(let i = 0; i < input.length; i++) {
      if(temp[input[i]]) temp[input[i]]++;
      else temp[input[i]] = 1;
    }
    count += Object.keys(temp).length;
  })
  return count;
}



const part2 = (inputs) => {
  let count = 0;
  inputs.forEach(input => {
    let temp = {};
    for (let i = 0; i < input.length; i++) {
      if (temp[input[i]]) temp[input[i]]++;
      else temp[input[i]] = 1;
    }
    //The number of members in a group equals to the occurrence of \n plus 1
    const numOfMemInGroup = temp["\n"] ? temp["\n"]+ 1: 1;

    for( const key in temp) {
      if (temp[key] === numOfMemInGroup && key !== "\n")
      count++;
    }
  })
  return count;
} 

module.exports = {
  readInput, 
  part1, 
  part2 }