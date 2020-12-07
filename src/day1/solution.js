const fs = require('fs');
const SUM = 2020;

let inputs;
try{
  inputs = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split("\n");
} catch (ex) {
  console.log("error read file", ex.message)
}

/**
 * Part 1
 * HashTable solution for finding two numbers in an array whose sum is equal to a given value 
 * Time complexity O(n)
 * Space complexity O(n)
 *   
 */ 
const part1 = (start, sum) => {
  let hashTable1 = {};
  for (let i = start; i < inputs.length; i++) {
    if (hashTable1[inputs[i]]) {
      return({num1:hashTable1[inputs[i]], num2:inputs[i]});
    }
    hashTable1[sum - inputs[i]] = inputs[i];
  }
}


/**
 * Part 2
 * * HashTable solution for finding three numbers in an array whose sum is equal to a given value
 * Time complexity O(n^2)
 * Space complexity O(n)
 *
 */
const part2 = (sum) => {
  for (let i = 0; i < inputs.length; i++) {
    const result = part1(i+1, sum - inputs[i])
    if(result) return({num3:inputs[i],...result})
  }
}

// const result = part1(0, SUM);
// console.log(`${result.num1} * ${result.num2} = ${result.num1 * result.num2}`);
const result2 = part2(SUM);
console.log(`${result2.num1} * ${result2.num2} *${result2.num3} = ${result2.num1 * result2.num2 * result2.num3}`);