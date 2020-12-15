const { 
  readInput, 
  part1,
  part2 } = require('./functions');

describe('test day8 solution ', () => {
  const dataset = [
    ["nop", + 0],
    ["acc", + 1],
    ["jmp", + 4],
    ["acc", + 3],
    ["jmp", - 3],
    ["acc", - 99],
    ["acc", + 1],
    ["jmp", - 4],
    ["acc", + 6]];
  
  test('readInput - read file line by line, convert to instruction and argument', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('part1 - test the value in the accumulator immediately before the program would run an instruction a second time', () => {
    expect(part1(dataset)).toBe(5);
  });

  test('part2 - test the value in the accumulator when the program terminates normally', () => {
    expect(part2(dataset)).toBe(8);
  });
})
