const { readInput, part1, part2 } = require('./functions');

describe('test day3 solution ', () => {
  const dataSet = [
    "..##.........##.........##.........##.........##.........##.......", 
    "#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..",
    ".#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.",
    "..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#",
    ".#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.",
    "..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....",
    ".#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#",
    ".#........#.#........#.#........#.#........#.#........#.#........#",
    "#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...",
    "#...##....##...##....##...##....##...##....##...##....##...##....#",
    ".#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#"
    ];

  test('read input text file', () => {
    expect(readInput("testInput.txt")).toEqual(dataSet);
  });

  test('part1 - calculate num of tree encountered with slope right 3, down 1', () => {
    expect(part1(dataSet, 3, 1)).toBe(7);
  });

  test('part1 - calculate num of tree encountered with slope right 1, down 1', () => {
    expect(part1(dataSet, 1, 1)).toBe(2);
  });

  test('part1 - calculate num of tree encountered with slope right 5, down 1', () => {
    expect(part1(dataSet, 5, 1)).toBe(3);
  });

  test('part1 - calculate num of tree encountered with slope right 3, down 1', () => {
    expect(part1(dataSet, 7, 1)).toBe(4);
  });

  test('part1 - calculate num of tree encountered with slope right 3, down 1', () => {
    expect(part1(dataSet, 1, 2)).toBe(2);
  });

  test('part2 - calculate multiplication of different slope dataSet', () => {
    expect( part1(dataSet, 1, 1)
          * part1(dataSet, 3, 1)
          * part1(dataSet, 5, 1)
          * part1(dataSet, 7, 1)
          * part1(dataSet, 1, 2)).toBe(336)
  });
})
