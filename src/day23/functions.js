const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => {}
        
      );
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const part1 = (inputs) => {
 
}


const part2 = (inputs) => {
  
} 


module.exports = {
  readInput, 
  part1, 
  part2 }