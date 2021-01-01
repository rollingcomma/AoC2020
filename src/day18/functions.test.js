const { 
  readInput, 
  evaluate1,
  evaluate2,
  part1,
  part2 } = require('./functions');

describe('test day18 solution ', () => {
  const dataset = [ ["1", "+", "(", "2", "*", "3", ")", "+", "(", "4", "*", "(", "5", "+", "6", ")", ")"], 
                    ["1", "+", "2", "*", "3", "+", "4", "*", "5", "+", "6"]];
  
  test('readInput - read input file, convert each line to expression array', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('evaluate1 - evaluate expression ', () => {
    expect(evaluate1(dataset[0])).toBe(51);
    expect(evaluate1(dataset[1])).toBe(71);
  });

  test('evaluate2 - evaluate expression with + has greater precedence ', () => {
    expect(evaluate2(dataset[0])).toBe(51);
    expect(evaluate2(dataset[1])).toBe(231);
  });

  test('part1 - calculate the sum of given array of expressions', () => {
    expect(part1(dataset)).toBe(122);
  });

  test('part2 - calculate the sum of given array of expressions', () => {
    expect(part2(dataset)).toBe(282);
  });
})
