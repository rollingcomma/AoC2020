const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day11 solution ', () => {
  const dataset = [
    ["F",10],
    ["N",3],
    ["F",7],
    ["R",90],
    ["F",11]
  ];
    test('readInput - read file line by line, convert each line to an array of instruction and argument', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test("part1 - count the ship's Manhattan distance from its starting position", () => {
    expect(part1(dataset)).toBe(25);
  });

  test('part2 - count number of occupied seats until no seats change state', () => {
    //expect(part2(dataset)).toBe(26);
  });
})
