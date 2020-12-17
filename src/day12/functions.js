const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => [input.substring(0,1), parseInt(input.substring(1))]);
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

/**
 * Description:
 * 
 * ######################################
 *        N        
 *        |
 *        |        
 * W -----|------ E
 *        |        
 *        |        
 *        S
 * ######################################
 * 
 * Orientation array : [n, e, s, w]
 * Direction:  R - clockwise, index increase; 
 *             L - anticlockwise, index decrease
 * if L turn results in negative index, add offset 4
 * 
 * 
 * @param {char} direction 
 * @param {int} angle 
 * @param {char} currentOrientation 
 * 
 * @returns {char} next orientation
 */
const orientationCalculator = (direction, angle, currentOrientation) => {
  const orientation = ["n","e", "s","w"];
  const currentIndex = orientation.indexOf(currentOrientation);
  const indexOffSet = angle / 90;
  const afterIndex = direction === "R" ? ((currentIndex + indexOffSet) % 4) : ((currentIndex - indexOffSet) % 4);
  return afterIndex >= 0? orientation[afterIndex]: orientation[4 + afterIndex];
}

const part1 = (inputs) => {
  let position = {n:0, s:0, e:0, w:0};
  let orentation = "e";
  inputs.forEach(instruction => {
    switch (instruction[0]) {
      case "N": {
        position["n"] += instruction[1]
        break;
      }
      case "S": {
        position["s"] += instruction[1]
        break;
      }
      case "E": {
        position["e"] += instruction[1]
        break;
      }
      case "W": {
        position["w"] += instruction[1]
        break;
      }
      case "F": {
        position[orentation] += instruction[1]
        break;
      }
      case "L": //fall through
      case "R": {
        orentation = orientationCalculator(instruction[0], instruction[1], orentation);
        break;
      }
    }
  });
  console.log(position)
  return Math.abs(position["s"] - position["n"]) + Math.abs(position["e"] - position["w"])
}


const part2 = (inputs) => {
  
}

module.exports = {
  readInput, 
  part1,
  part2 }