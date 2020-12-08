const { readInput, part1, part2 } = require('./functions');

describe('test day2 solution ', () => {
  const dataSet = [["1-3", "a:", "abcde"], ["1-3", "b:", "cdefg"], ["2-9", "c:", "ccccccccc"]];

  test('read input text file', () => {
    expect(readInput("testInput.txt")).toEqual(dataSet);
  });

  test('part1 - Validate dataSet', () => {
    expect(part1(dataSet)).toBe(2);
  });

  test('part2 - Validate dataSet', () => {
    expect(part2(dataSet)).toBe(1);
  });
})
