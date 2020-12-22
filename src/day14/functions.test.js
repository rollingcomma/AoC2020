const { 
  readInput, 
  applyMask,
  part1,
  addrDecoder,
  part2 } = require('./functions');

describe('test day5 solution ', () => {
  const dataset = [
    { mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X"},
    { addr: 8,
      value: 11},
    {
      addr: 7,
      value: 101
    },
    {
      addr: 8,
      value: 0
    }];

  const dataset2 = [
    {mask: "000000000000000000000000000000X1001X"},
    {
      addr: 42, 
      value: 100
    },
    {mask: "00000000000000000000000000000000X0XX"},
    {
      addr: 26, 
      value: 1
    }];

  test('readInput - ', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('applyMask - apply mask to input value: 0 -> 0, 1 -> 1, X -> unchanged', () => {
    expect(applyMask(11, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X")).toBe("000000000000000000000000000001001001");
  });

  test('part1 - calculate sum of all values in memory after the initialization program completes, mask apply to value', () => {
    expect(part1(dataset)).toBe(165);
  });

  test('addrDecoder - apply mask to address: 0 -> unchanged, 1 -> 1, X -> 1 or 0', () => {
    expect(addrDecoder(42, "000000000000000000000000000000X1001X")).toEqual([26,27,58,59]);
  });

  test('part2 - calculate sum of all values in memory after the initialization program completes, mask apply to addr', () => {
    expect(part2(dataset2)).toBe(208);
  });
})
