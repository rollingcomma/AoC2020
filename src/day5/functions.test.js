const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day5 solution ', () => {
  const dataset = [[44,5],[70,7],[14,7],[102,4]];

  test('readInput - read file line by line, convert each line to binary, and calculate value', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('part1 - calculate largest seat ID', () => {
    expect(part1(dataset)).toBe(820);
  });

  test('part2 - calculate missing seat ID', () => {
    
    
  });
})
