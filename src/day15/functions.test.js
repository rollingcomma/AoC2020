const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day15 solution ', () => {
  const dataset = [
    [0, 3, 6],
    [1, 3, 2],
    [2, 1, 3],
    [1, 2, 3],
    [2, 3, 1],
    [3, 2, 1],
    [3, 1, 2]
  ];

  test('readInput - read file covert each line to array of number ', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('part1 - calculate the 2020th number spoken', () => {
    expect(part1(dataset[0], 2020)).toBe(436);
    expect(part1(dataset[1], 2020)).toBe(1);
    expect(part1(dataset[2], 2020)).toBe(10);
    expect(part1(dataset[3], 2020)).toBe(27);
    expect(part1(dataset[4], 2020)).toBe(78);
    expect(part1(dataset[5], 2020)).toBe(438);
    expect(part1(dataset[6], 2020)).toBe(1836);
  });

  test('part1 - calculate the 30000000th number spoken', () => {
    expect(part1(dataset[0], 30000000)).toBe(175594);
    // expect(part1(dataset[1], 30000000)).toBe(2578);
    // expect(part1(dataset[2], 30000000)).toBe(3544142);
    // expect(part1(dataset[3], 30000000)).toBe(261214);
    // expect(part1(dataset[4], 30000000)).toBe(6895259);
    // expect(part1(dataset[5], 30000000)).toBe(18);
    // expect(part1(dataset[6], 30000000)).toBe(362);
  });
})
