const { 
  readInput, 
  adjacentOccupiedCount,
  firstSeatOccupiedCount,
  simulateSeating,
  part1,
  part2 } = require('./functions');

describe('test day11 solution ', () => {
  const dataset = [
    ["L",".","L","L",".","L","L",".","L","L"],
    ["L","L","L","L","L","L","L",".","L","L"],
    ["L",".","L",".","L",".",".","L",".","."],
    ["L","L","L","L",".","L","L",".","L","L"],
    ["L",".","L","L",".","L","L",".","L","L"],
    ["L",".","L","L","L","L","L",".","L","L"],
    [".",".","L",".","L",".",".",".",".","."],
    ["L","L","L","L","L","L","L","L","L","L"],
    ["L",".","L","L","L","L","L","L",".","L"],
    ["L",".","L","L","L","L","L",".","L","L"]
  ];
  const result1 = [
    ["#",".","#","L",".","L","#",".","#","#"],
    ["#","L","L","L","#","L","L",".","L","#"],
    ["L",".","#",".","L",".",".","#",".","."],
    ["#","L","#","#",".","#","#",".","L","#"],
    ["#",".","#","L",".","L","L",".","L","L"],
    ["#",".","#","L","#","L","#",".","#","#"],
    [".",".","L",".","L",".",".",".",".","."],
    ["#","L","#","L","#","#","L","#","L","#"],
    ["#",".","L","L","L","L","L","L",".","L"],
    ["#",".","#","L","#","L","#",".","#","#"]
  ];

  const result2 = [
    ["#",".","L","#",".","L","#",".","L","#"],
    ["#","L","L","L","L","L","L",".","L","L"],
    ["L",".","L",".","L",".",".","#",".","."],
    ["#","#","L","#",".","#","L",".","L","#"],
    ["L",".","L","#",".","L","L",".","L","#"],
    ["#",".","L","L","L","L","#",".","L","L"],
    [".",".","#",".","L",".",".",".",".","."],
    ["L","L","L","#","#","#","L","L","L","#"],
    ["#",".","L","L","L","L","L","#",".","L"],
    ["#",".","L","#","L","L","#",".","L","#"]
  ]

  test('readInput - read file line by line, convert each line to an array of characters', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('simulateSeating - Simulate your seating area', () => {
    expect(simulateSeating(dataset, adjacentOccupiedCount, 3)).toEqual(result1);
    expect(simulateSeating(dataset, firstSeatOccupiedCount, 4)).toEqual(result2);
  });

  test('part1 - count number of occupied seats until no seats change state ', () => {
    expect(part1(dataset)).toBe(37);
  });

  test('part2 - count number of occupied seats until no seats change state', () => {
    expect(part2(dataset)).toBe(26);
  });
})
