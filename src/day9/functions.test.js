const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day8 solution ', () => {
  const dataset = [35,20,15,25,47,40,62,55,65,95,102,117,150,182,127,219,299,277,309,576];
  
  test('readInput - read file line by line, convert each line to an integer', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('part1 -  find the first number in the list which is not the sum of two of the 5 numbers before it', () => {
    expect(part1(dataset, 5)).toBe(127);
  });

  test('part2 - find (min + max) of the contiguous set of numbers in the list which sum to the invalid number part 1', () => {
    expect(part2(dataset, 5)).toBe(62);
  });
})
