const { 
  readInput, 
  extractRules,
  part1,
  part2 } = require('./functions');

describe('test day7 solution ', () => {
  const dataset = [
    "light red bags contain 1 bright white bag, 2 muted yellow bags.",
    "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
    "bright white bags contain 1 shiny gold bag.",
    "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.", 
    "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
    "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
    "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
    "faded blue bags contain no other bags.",
    "dotted black bags contain no other bags."];
  
  const rules = { 
            light_red: { bright_white: 1, muted_yellow: 2 } ,
            dark_orange: { bright_white: 3, muted_yellow: 4 } ,
            bright_white: { shiny_gold: 1 } ,
            muted_yellow: { shiny_gold: 2, faded_blue: 9},
            shiny_gold: { dark_olive: 1, vibrant_plum: 2},
            dark_olive: { faded_blue: 3, dotted_black: 4},
            vibrant_plum: { faded_blue: 5, dotted_black: 6},
            faded_blue: null,
            dotted_black: null
          };
      

  test('readInput - read file line by line', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('extractRules - extract rules from string', () => {
    expect(extractRules(dataset)).toEqual(rules);
  });

  test('part1 - count the number of valid rules for carry at least one shiny gold bag', () => {
    expect(part1(dataset)).toBe(4);
  });

  test('part2 - count the number of bags a shiny gold bag can contain', () => {
    expect(part2(dataset)).toBe(32);
  });
})
