const { readInput, part1, part2 } = require('./functions');

const inputs = readInput("input.txt");
const count = part1(inputs, 3, 1);
const count2 =  part1(inputs, 1, 1)
              * part1(inputs, 3, 1)
              * part1(inputs, 5, 1)
              * part1(inputs, 7, 1)
              * part1(inputs, 1, 2);

console.log(count2)