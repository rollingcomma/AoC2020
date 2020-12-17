const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day13 solution ', () => {
  const dataset = {
    timestamp: 939,
    busSchedules: [7, 13, "x", "x", 59, "x", 31, 19]};

  test('readInput - convert first line to timestamp, second line to bus schedules ', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('part1 - ID of the earliest bus multiply wait time', () => {
    expect(part1(dataset)).toBe(295);
  });

  test('part2 - find the earliest timestamp that matches the list ', () => {
    expect(part2([7, 13, "x", "x", 59, "x", 31, 19])).toBe(1068781);
    expect(part2([17, "x", 13, 19])).toBe(3417);
    expect(part2([67, 7, 59, 61])).toBe(754018);
    expect(part2([1789, 37, 47, 1889])).toBe(1202161486);
  });
})
