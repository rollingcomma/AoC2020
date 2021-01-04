const fs = require('fs');
//const cycles = 6;
const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => input.split(""));
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const xLayerCount = (position, cubes) => {
  let count = 0;
  //console.log(position);
  const [z, y, x] = position; 
  const zLength = cubes.length;
  const length = cubes[0].length;

  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      //console.log(i, j);
      if ((z + i) >= 0 && ( y + j) >= 0 && (z + i) < zLength && (y + j) < length && cubes[z + i][y + j][x] === "#") count++;
    }
  }
  return count;
}

const xLayerCount2 = (position, cubes) => {
  let count = 0;
  const [w, z, y, x] = position;
  const zLength = cubes.length;
  const length = cubes[0][0].length;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        if ((w + i) >= 0 && (z + j) >= 0 && (y + k) >= 0 
            && (w + i) < zLength && (z + j) < zLength && (y + k) < length 
            && cubes[w + i][z + j][y + k][x] === "#"){
              count++;
        }
      }
    }
  }
  return count;
}

const isActive = (key, activeNeighbor) => {
  if (key === "active" && (activeNeighbor === 2 || activeNeighbor === 3)) return true;
  if(key === "inactive" && activeNeighbor === 3) return true;
  return false;
}

/**
 * Description: expand the input 2D array to a 3D array
 * assuming input 2D array size -> [s][s]
 * output 3D array size -> [2cycles+1][2cycles+s][2cycles+s]
 * 
 * @param {2d Array} inputs 
 * @param {int} cycles
 * *
 * @returns {3D Array} cubes
 */
const expand = (inputs, cycles) => {
  const zSize = 2 * cycles + 1;
        inputSize = inputs.length,
        cubeSize = inputSize + 2 * cycles,
        cubes = [];
  //initialize cubes - all cubes are inactive
  for (let z = 0; z < zSize; z++) {
    cubes[z] = []
    for (let y = 0; y < cubeSize; y++) {
      cubes[z][y] = []
      for (let x = 0; x < cubeSize; x++) {
        cubes[z][y][x] = ".";
      }
    }
  }
  //update cubes with input state
  for(let y = 0; y < inputSize; y++) {
    for(let x = 0; x < inputSize; x++) {
      cubes[cycles][y+cycles][x+cycles] = inputs[y][x];
    }
  }
  return cubes;
}

/**
 * Description:
 * if cycles not equals to 0, recursively calculate and update cubes' lower layers state and populate the (middle + 1) with its reflection layer (middle - 1)
 * if cycles equals to 0, return count
 *
 * 
 * @param {3D Array} cubes 
 * @param {int} count 
 * @param {int} cycles 
 * 
 * base case
 * @returns {int} count
 * 
 */
const cycle = (cubes, count, cycles) => {
  //base case
  if (cycles === 0) return count;

  const zSize = cubes.length;
        middleZ = (zSize - 1)/2;
        cubeSize = cubes[0].length;

  let previous = {},
      newCubes = JSON.parse(JSON.stringify(cubes)),
      neighborCount = 0
      activeCubeCount = 0;

  for (let z = cycles-1; z < middleZ + 1; z++) {
    let layerCount = 0;
    //let range = cubeSize - cycles + 1;
    for (let y = 0; y < cubeSize ; y++) {
      for (let x = 0; x < cubeSize; x++) {
        const key = cubes[z][y][x] === "#" ? "active" : "inactive";
        if (x === 0) {
          previous.l = 0;
          previous.m = xLayerCount([z, y, 0], cubes);
          previous.r = xLayerCount([z, y, 1], cubes);
          neighborCount = previous.m + previous.r;
        } else {
          const r = x < (cubeSize - 1)? xLayerCount([z, y, x + 1], cubes):0;
          neighborCount = previous.m + previous.r + r;
          previous.l = previous.m;
          previous.m = previous.r;
          previous.r = r;
        } 
      
        neighborCount = key === "active" ? --neighborCount : neighborCount;
        if (isActive(key, neighborCount)) {
          newCubes[z][y][x] = "#";
          //newCubes[zSize - z - 1][y][x] = "#";
          layerCount++;
        } else {
          newCubes[z][y][x] = ".";
        }
      }
    }
    activeCubeCount += z !== middleZ? 2 * layerCount : layerCount;
  }
  
  /**
   * The middle layer's state changes depending on the layer below it
   * thus, new cubes only need to populate the (middleZ + 1) with its reflection layer (middleZ - 1)
   */
  newCubes[middleZ + 1] = newCubes[middleZ - 1];

  return cycle(newCubes, activeCubeCount, cycles - 1);
}

/**
 * Part 2 pattern : 
 *  - middle = (size of cube - 1) / 2
 *  - assume cube are divided by middle layer into upper layers and lower layers
 *  - upper layers are mirrors of lower layers at both w & z axis
 * 
 *   After 1 cycle:
 *   w=0                  w=1                 w=2
 *   z=0    1      2        0     1     2       0     1     2
 *   #..   #..   #..       #..   #.#   #..     #..   #..   #..
 *   ..#   ..#   ..#       ..#   .##   ..#     ..#   ..#   ..#
 *   .#.   .#.   .#.       .#.   .#.   .#.     .#.   .#.   .#.
 *   
 *   
 *   After 2 cycles:
 *   w=0                                       1
 *   z=0       1      2       3       4        z=0         1         2         3         4
 *   .....   .....   ###..   .....   .....     .....     .....     .....     .....     .....
 *   .....   .....   ##.##   .....   .....     .....     .....     .....     .....     .....
 *   ..#..   .....   #...#   .....   ..#..     .....     .....     .....     .....     .....
 *   .....   .....   .#..#   .....   .....     .....     .....     .....     .....     .....
 *   .....   .....   .###.   .....   .....     .....     .....     .....     .....     .....
 *   
 *   w=2
 *   z=0       1      2       3       4
 *   ###..   .....   .....   .....   ###..
 *   ##.##   .....   .....   .....   ##.##
 *   #...#   .....   .....   .....   #...#
 *   .#..#   .....   .....   .....   .#..#
 *   .###.   .....   .....   .....   .###.
 *   
 *   w=3                                        4
 *   z=0       1       2       3       4        z=0       1       2       3       4
 *   .....   .....   .....   .....   .....      .....   .....   ###..   .....   .....
 *   .....   .....   .....   .....   .....      .....   .....   ##.##   .....   .....
 *   .....   .....   .....   .....   .....      ..#..   .....   #...#   .....   ..#..
 *   .....   .....   .....   .....   .....      .....   .....   .#..#   .....   .....
 *   .....   .....   .....   .....   .....      .....   .....   .###.   .....   .....
 */


/**
 * Description: expand the input 2D array to a 4D array
 * assuming input 2D array size -> [s][s]
 * output 4D array size -> [2cycles+1][2cycles+1][2cycles+s][2cycles+s]
 *
 * @param {2d Array} inputs
 * @param {int} cycles
 * 
 * @returns {4D Array} cubes
 */
const expand2 = (inputs, cycles) => {
  const zSize = 2 * cycles + 1;
  inputSize = inputs.length,
    cubeSize = inputSize + 2 * cycles,
    cubes = [];
  //initialize cubes - all cubes are inactive
  for (let w = 0; w < zSize; w++) {
    cubes[w] = []
    for (let z = 0; z < zSize; z++) {
      cubes[w][z] = []
      for (let y = 0; y < cubeSize; y++) {
        cubes[w][z][y] = []
        for (let x = 0; x < cubeSize; x++) {
          cubes[w][z][y][x] = ".";
        }
      }
    }
  }
  //update cubes with input state
  for (let y = 0; y < inputSize; y++) {
    for (let x = 0; x < inputSize; x++) {
      cubes[cycles][cycles][y + cycles][x + cycles] = inputs[y][x];
    }
  }
  return cubes;
}

/**
 * Description: 
 * if cycles not equals to 0, recursively calculate and update cubes' lower layers state and populate the (middle + 1) with its reflection layer (middle - 1)
 * if cycles equals to 0, return count
 * 
 * @param {4D Array} cubes 
 * @param {int} count 
 * @param {int} cycles 
 * 
 * @returns {int} count
 */
const cycle2 = (cubes, count, cycles) => {
  //base case
  if (cycles === 0) return count;
  
  const zSize = cubes.length;
        middle = (zSize - 1) / 2;
        cubeSize = cubes[0][0].length;

  let previous = {},
      newCubes = JSON.parse(JSON.stringify(cubes)),
      neighborCount = 0
      activeCubeCount = 0;

  for (let w = cycles - 1; w <= middle; w++) {
    let zCount = 0;
    for (let z = cycles - 1; z <= middle; z++) {
      let layerCount = 0;
      for (let y = 0; y < cubeSize; y++) {
        for (let x = 0; x < cubeSize; x++) {
          const key = cubes[w][z][y][x] === "#" ? "active" : "inactive";
          if (x === 0) {
            previous.l = 0;
            previous.m = xLayerCount2([w, z, y, 0], cubes);
            previous.r = xLayerCount2([w, z, y, 1], cubes);
            neighborCount = previous.m + previous.r;
          } else {
            const r = x < (cubeSize - 1) ? xLayerCount2([w, z, y, x + 1], cubes) : 0;
            neighborCount = previous.m + previous.r + r;
            previous.l = previous.m;
            previous.m = previous.r;
            previous.r = r;
          }
          
          neighborCount = key === "active" ? --neighborCount : neighborCount;
          if (isActive(key, neighborCount)) {
            newCubes[w][z][y][x] = "#";
            layerCount++;
          } else {
            newCubes[w][z][y][x] = ".";
          }
        }
      }
     
      zCount += (z === middle)? layerCount : 2 * layerCount;
    }
    activeCubeCount += (w === middle)? zCount : 2 * zCount;
  }

  /**
   * The middle layer's state changes depending on the layer below it
   * thus, new cubes only need to populate the (middle + 1) with its reflection layer (middle - 1)
   * for both z & w axis
   */
  for (let w = cycles - 1; w <= middle; w++) {
    newCubes[w][middle + 1] = newCubes[w][middle - 1];
  }

  for (let z = cycles - 1 ; z <= zSize - cycles; z++) { 
    newCubes[middle + 1][z] = newCubes[middle - 1][z];
  }
  
  return cycle2(newCubes, activeCubeCount, cycles - 1);
}

const part1 = (inputs) => {
  const cubes = expand(inputs, 6);
  return cycle(cubes, 0, 6);
}

const part2 = (inputs) => {
  const cubes = expand2(inputs, 6);
  return cycle2(cubes, 0, 6);
} 


module.exports = {
  readInput,
  xLayerCount,
  expand,
  cycle, 
  part1,
  expand2, 
  cycle2,
  part2 }