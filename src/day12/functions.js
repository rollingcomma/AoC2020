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
 * Description: calculate the ship's orientation after rotating by given degree
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
 *             L - counter-clockwise, index decrease
 * if L turn results in negative index, add offset 4
 * 
 * 
 * @param {char} direction 
 * @param {int} degree 
 * @param {char} currentOrientation 
 * 
 * @returns {char} next orientation
 */
const orientationCalculator = (direction, degree, currentOrientation) => {
  const orientation = ["n","e", "s","w"];
  const currentIndex = orientation.indexOf(currentOrientation);
  const indexOffSet = degree / 90;
  const afterIndex = direction === "R" ? ((currentIndex + indexOffSet) % 4) : ((currentIndex - indexOffSet) % 4);
  return afterIndex >= 0? orientation[afterIndex]: orientation[4 + afterIndex];
}

const part1 = (inputs) => {
  let position = {n:0, s:0, e:0, w:0},
      orentation = "e";
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
  return Math.abs(position["s"] - position["n"]) + Math.abs(position["e"] - position["w"])
}

/**
 * Description: calculate the waypoint postion when rotate R or L
 *
 * Rotating to L (counter-clockwise) n degree equals to rotating R (clockwise) 360 - n degree
 * 
 * Use counter-clockwise rotation matrix - @ degree 
 * to calculate new position (x', y') after rotating by given degree
 *
 * x'   | cos@  -sin@ |   | x |
 *    = |             | * |   |
 * y'   | sin@   cos@ |   | y |
 *
 *  
 * @param {char} direction 
 * @param {int} degree 
 * @param {object} currentPosition 
 * 
 * @returns {object} newPosition
 */
const waypointPositionCalculator = (direction, degree, currentPosition) => {
  degree = degree % 360; //mod 
  
  //convert clockwise rotation to counter-clockwise rotation
  if(direction === "R") {
    degree = 360 - degree;
  }
  
  //map orientation to (x, y) axis
  const x = currentPosition["e"] - currentPosition["w"];
  const y = currentPosition["n"] - currentPosition["s"];
  
  const newX = x * Math.round(Math.cos(degree * Math.PI / 180))
                     - y * Math.round(Math.sin(degree * Math.PI / 180));
  const newY = x * Math.round(Math.sin(degree * Math.PI / 180))
                     + y * Math.round(Math.cos(degree * Math.PI / 180));

  //map (x, y) position to orientation 
  let newPosition = {n:0, s:0, e:0, w:0};
  if(newX >= 0) { 
    newPosition["e"] = newX;
  } else {
    newPosition["w"] = -newX;
  }
  if (newY >= 0) {
    newPosition["n"] = newY;
  } else {
    newPosition["s"] = -newY;
  }
  return newPosition;
}

const part2 = (inputs) => {
  let shipPosition = { n: 0, s: 0, e: 0, w: 0 },
      waypointPosition = { n:1, s:0, e:10, w:0 };
      
  inputs.forEach(instruction => {
    switch (instruction[0]) {
      case "N": {
        waypointPosition["n"] += instruction[1]
        break;
      }
      case "S": {
        waypointPosition["s"] += instruction[1]
        break;
      }
      case "E": {
        waypointPosition["e"] += instruction[1]
        break;
      }
      case "W": {
        waypointPosition["w"] += instruction[1]
        break;
      }
      case "F": {
        for(const prop in shipPosition) {
          shipPosition[prop] += instruction[1] * waypointPosition[prop];
        }
        break;
      }
      case "L": //fall through
      case "R": {
        waypointPosition = waypointPositionCalculator(instruction[0], instruction[1], waypointPosition);
        break;
      }
    }
  });
  return Math.abs(shipPosition["s"] - shipPosition["n"]) + Math.abs(shipPosition["e"] - shipPosition["w"])
}

module.exports = {
  readInput, 
  orientationCalculator,
  waypointPositionCalculator,
  part1,
  part2 }