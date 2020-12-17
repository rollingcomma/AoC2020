const fs = require('fs');

const readInput = (file) => {
  try {
    const inputs = fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n");
    return { 
      timestamp: parseInt(inputs[0]), 
      busSchedules: inputs[1].split(',').map(item => item !=="x"? parseInt(item): item)
    }
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const part1 = (inputs) => {
  const busSchedules = inputs["busSchedules"].filter(item => item !=="x");
  const firstBus = busSchedules[0];
  let minWaitBus = [firstBus, firstBus - (inputs["timestamp"] % firstBus) ];
  for(let i = 1; i< busSchedules.length; i++){
    const bus = busSchedules[i];
    const waitTime = bus - (inputs["timestamp"] % bus);
    
    if (waitTime < minWaitBus[1])
    minWaitBus =[bus, waitTime];
  }
  return minWaitBus[0] * minWaitBus[1];
}

const findPattern = (base, jump, interval, offset) => {
  if((base + offset) % interval === 0) return base;
  //find the first occurrence of the pattern
  do {
    base += jump;
  } while ((base + offset) % interval !== 0);
  let startBase = base;
  //find the duration of pattern' repetition
  do {
    base += jump;
  } while ((base + offset) % interval !== 0 );

  return [startBase, base-startBase] ;
}

const part2 = (inputs) => {
  //extract buses id and offset
  let matrix = {};
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] !== "x") {
      matrix = { ...matrix, ...{[i]:inputs[i]}};
    }
  }  
  let base = 1, jump = 1;
  for(const prop in matrix) {
    const res = findPattern(base, jump, matrix[prop], parseInt(prop));
    base = res[0];
    jump = res[1]
   
  }
  return base;
  
  // //brute force calculate 
  // //start = ((max[0] + max[1]) % (first[1])) === 0 ? first[1] : (first[1] * max[1] + max[0]),
  // let start = max[1] - max[0],
  //     jump = max[1];
  // let isInvalid;
  
  // do {
  //   isInvalid = false;
  //   for(let offset in matrix) {
  //     if (((start + parseInt(offset)) % matrix[offset]) !== 0) {
  //       isInvalid = true;
  //       break;
  //     }
  //   }
  //   //console.log(start)
  //   start += jump;
  // } while(isInvalid);
  // return start - jump;
} 

module.exports = {
  readInput, 
  part1, 
  part2 }