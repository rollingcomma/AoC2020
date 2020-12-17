const { 
  readInput, 
  orientationCalculator,
  part1,
  waypointPositionCalculator,
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

  test('orientationCalculator - calculator orientation after turn a given angle', () => {
    expect(orientationCalculator("R", 180, "e")).toEqual("w");
    expect(orientationCalculator("R", 0, "e")).toEqual("e");
    expect(orientationCalculator("R", 360, "e")).toEqual("e");
    expect(orientationCalculator("R", 630, "e")).toEqual("n");
    expect(orientationCalculator("L", 270, "e")).toEqual("s");
    expect(orientationCalculator("L", 0, "e")).toEqual("e");
    expect(orientationCalculator("L", 360, "e")).toEqual("e");
    expect(orientationCalculator("L", 630, "e")).toEqual("s");
  });
  
  test("part1 - count the ship's Manhattan distance from its starting position", () => {
    expect(part1(dataset)).toBe(25);
  });

  test('waypointPositionCalculator - calculator waypoint position after turn a given angle', () => {
    expect(waypointPositionCalculator("R", 90, { n: 1, s: 0, e: 10, w: 0 })).toEqual({ n: 0, s: 10, e: 1, w: 0 });
  });

  test('part2 - count number of occupied seats until no seats change state', () => {
    expect(part2(dataset)).toBe(286);
  });
})
