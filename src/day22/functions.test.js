const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day5 solution ', () => {
  const dataset = [[44,5],[70,7],[14,7],[102,4]];

  test('readInput - ', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('part1 - ', () => {
    expect(part1(dataset)).toBe(820);
  });

  test('part2 - ', () => {
    expect(part1(dataset)).toBe(820);
  });
})
