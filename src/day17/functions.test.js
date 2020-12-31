const { 
  readInput, 
  xLayerCount,
  expand,
  cycle,
  part1,
  part2 } = require('./functions');

describe('test day17 solution ', () => {
  const dataset = [[".", "#", "."], [".", ".", "#"], ["#", "#", "#"]];
  const expandedData = [
                        [[".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."]],

                        [[".", ".", ".", ".", "."], 
                         [".", ".", "#", ".", "."], 
                         [".", ".", ".", "#", "."], 
                         [".", "#", "#", "#", "."], 
                         [".", ".", ".", ".", "."]],

                        [[".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."], 
                         [".", ".", ".", ".", "."]]
                      ];
  
  test('readInput - read input line by line convert to 2D array of single char ', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('expand - expand cubes at 3 directions by number of cycle', () => {
    expect(expand(dataset, 1)).toEqual(expandedData);
  });

  test('xLayerCount - count active cubes in 3*3 2d array of given position with x fixed ', () => {
    expect(xLayerCount([1,1,3], expandedData)).toBe(1);
    expect(xLayerCount([1,2,2], expandedData)).toBe(2);
  });

  test('cycle - count active cube after cycle', () => {
    expect(cycle(expandedData, 0, 1)).toBe(11);
    expect(cycle(expand(dataset, 2), 0, 2)).toBe(21);
  });

  test('part1 - count active cubes after the sixth cycle for 3D array', () => {
    expect(part1(dataset)).toBe(112);
  });

  test('part2 - count active cubes after the sixth cycle for 4D array', () => {
    //expect(part2(dataset)).toBe(848);
  });
})
