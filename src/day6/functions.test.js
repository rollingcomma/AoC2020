const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day6 solution ', () => {
  const dataset = ["abc","a\nb\nc","ab\nac","a\na\na\na", "b"];

  test('readInput - read file line by line, convert each line to binary, and calculate value', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('part1 - count the number of questions to which anyone in the group answered "yes"', () => {
    expect(part1(dataset)).toBe(11);
  });

  test('part2 - count the number of questions to which everyone in the group answered "yes"', () => {
    expect(part2(dataset)).toBe(6);
    
  });
})
