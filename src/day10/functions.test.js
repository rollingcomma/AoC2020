const { 
  readInput, 
  part1,
  factorialCalculator,
  combinationCalculator,
  combinasonsMaxGap,
  part2 } = require('./functions');

describe('test day10 solution ', () => {
  const dataset1 = [16,10,15,5,1,11,7,19,6,12,4];
  const dataset2 = [28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3];
  
  test('readInput - read file line by line, convert each line to an integer', () => {
    expect(readInput("testInput1.txt")).toEqual(dataset1);
    expect(readInput("testInput2.txt")).toEqual(dataset2);
  });

  test('part1 -  find the first number in the list which is not the sum of two of the 5 numbers before it', () => {
    expect(part1(dataset1)).toBe(35);
    expect(part1(dataset2)).toBe(220);
  });

  test('factorialCalculator -  factorial calculator', () => {
    expect(factorialCalculator(5)).toBe(120);
    expect(factorialCalculator(1)).toBe(1);
  });

  test('combinationCalculator -  combination calculator for given c(n, r)', () => {
    expect(combinationCalculator(5, 3)).toBe(10);
    expect(combinationCalculator(5, 5)).toBe(1);
  });

  test('combinasonsMaxGap -  calculate all combinations of a given size of contiguous numbers with maximum gap', () => {
    expect(combinasonsMaxGap(3, 3)).toBe(2);
    expect(combinasonsMaxGap(4, 3)).toBe(4);

  });
  
  test('part2 - calculate the total number of distinct arrangements of given adapter', () => {
    expect(part2(dataset1)).toBe(8);
    expect(part2(dataset2)).toBe(19208);
  });
})
