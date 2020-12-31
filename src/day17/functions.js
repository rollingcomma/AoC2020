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

const isActive = (key, activeNeighbor) => {
  if (key === "active" && (activeNeighbor === 2 || activeNeighbor === 3)) return true;
  if(key === "inactive" && activeNeighbor === 3) return true;
  return false;
}

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
          layerCount++;
        } else {
          newCubes[z][y][x] = ".";
        }
      }
    }
    activeCubeCount += z !== middleZ? 2 * layerCount : layerCount;
  }
  
  for (let z = 1; z <= middleZ ; z++) {
    newCubes[middleZ + z] = newCubes[middleZ - z];
  }
  return cycle(newCubes, activeCubeCount, cycles - 1);
}

const part1 = (inputs) => {
  const cubes = expand(inputs, 6);
  return cycle(cubes, 0, 6);
}

const part2 = (inputs) => {
  
} 


module.exports = {
  readInput,
  xLayerCount,
  expand,
  cycle, 
  part1, 
  part2 }