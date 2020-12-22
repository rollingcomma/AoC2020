const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => {
        if(input.substring(0,4) === "mask") {
          return {mask: input.substring(7)}
        } else {
          const pattern = /mem\[(\d+)\]\s=\s(\d+)/;
          const [, addr, value] = pattern.exec(input);
          return {addr: parseInt(addr), value: parseInt(value)};
        }
      });
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

/**
 * Description: Reference only - bitwise only works on 32 bits number, default is signed
 * calculate sum of all values in memory after the initialization program completes
 *
 * bitwise operator: & AND | OR
 * a:    00000000000000000000000000000101
 * b:    00000000000000000000000000000011
 *
 * a | b 00000000000000000000000000000111
 * output: 7
 * a & b 00000000000000000000000000000001
 * output: 1
 *
 * @param {array} inputs
 */
const bitwiseMask = (inputs) => {
  let maskAnd, maskOr, mem = {};
  for (const input of inputs) {
    //console.log(input)
    if (input["mask"]) {
      //overwritten with 0 - convert X to 1, 1 AND any = any, 0 AND any = 0
      maskAnd = parseInt(input.mask.replace(/X/g, "1"), 2);
      //overwritten with 1 - covert X to 0, 0 OR any = any, 1 OR any = 1
      maskOr = parseInt(input.mask.replace(/X/g, "0"), 2);
    } else {
      console.log(maskAnd, maskOr);
      // >>>0 unsigned shift convert signed 32 bits to unsigned
      mem[input.addr] = ((input.value & maskAnd) | maskOr) >>> 0;
    }
  }
}

/**
 * Description: apply mask to input value bit by bit
 * 
 * @param {int} input 
 * @param {string} mask 
 * 
 * @returns {string} input string after mask applied
 */
const applyMask = (input, mask) => {
  
  const strBin = input.toString(2).padStart(36,"0").split("");
  for(let i = 0; i < 36; i++) {
    if(mask[i] !== "X") {
      strBin[i] = mask[i];
    }
  }
  return strBin.join("");
}

/**
 * Description: calculate sum of all values in memory after the initialization program completes
 * 
 * 
 * @param {array} inputs 
 */
const part1 = (inputs) => {
  let mask, mem = {}, sum = 0;
  for(const input of inputs) {
    //console.log(input)
    if (input["mask"]) {
      mask = input["mask"];
    } else {
      mem[input.addr] = parseInt(applyMask(input.value, mask),2)
    }
  }
  
  Object.values(mem).forEach(v => {
    sum += v;
  })
  return sum
}

/**
 * Description: Apply mask to address, and calculate all valid addresses
 *  
 * @param {int} addr 
 * @param {string} mask 
 * 
 * @returns {array} all valid addresses
 */
const addrDecoder = (addr, mask) => {
  const addrOffsets = [], addrArray = [];
  const addrStr = addr.toString(2).padStart(36, "0").split("");
  /* apply mask to set address 
   * 1 -> overwritten with 1
   * 0 -> unchanged
   * X -> overwritten with 0 and calculate address offset 2^(35-index)
   */
  for (let i = 0; i < 36; i++) {
    if (mask[i] === "1") {
      addrStr[i] = "1";
    } else if (mask[i] === "X"){
      addrStr[i] = "0";
      addrOffsets.push(Math.pow(2, 35-i))
    }
  }

  addr  = parseInt(addrStr.join(""), 2);
  const addrCount = Math.pow(2, addrOffsets.length); // total number of combinasons 

  for (let i = 0; i < addrCount; i++ ){
    const comb = i.toString(2).padStart(addrOffsets.length, "0").split("");
    let offset = 0;
    for(let j = 0; j < addrOffsets.length; j++) {
      offset += parseInt(comb[j]) * addrOffsets[j];
    }
    addrArray.push(addr + offset)
  }
  return addrArray;
}

const part2 = (inputs) => {
  let mask, mem = {}, sum = 0;
  for (const input of inputs) {
    if (input["mask"]) {
      mask = input["mask"];
    } else {
      const addrArray = addrDecoder(input.addr, mask);
      addrArray.forEach(addr => {
        mem[addr] = input.value;
      })
    }
  }

  Object.values(mem).forEach(v => {
    sum += v;
  })
  return sum
} 


module.exports = {
  readInput, 
  applyMask,
  part1, 
  addrDecoder,
  part2 }