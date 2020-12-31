const { 
  readInput, 
  isValid,
  part1,
  ticketsFilter,
  fieldsMatch,
  commonFields,
  findOrderedFields
 } = require('./functions');

describe('test day16 solution ', () => {
  const dataset = [
    {
      class: {first:[1, 3], second:[5, 7]},
      row: {first:[6, 11], second: [33, 44]},
      seat: {first:[13, 40],second: [45, 50]}
    },
    [7, 1, 14],
    [
      [7, 3, 47],
      [40, 4, 50],
      [55, 2, 20],
      [38, 6, 12]
    ]
  ];

  const dataset1 = [
    {class: 7, row: 7},
    {class: 1},
    {seat: 14}
  ];

  const dataset2 = [
    [
      { row: 3 },
      { class: 9, row: 9, seat: 9 },
      { class: 18, row: 18, seat: 18 },
    ],
    [
      { class: 15, row: 15, seat: 15 },
      { class: 1, row: 1, seat: 1 },
      { class: 5, row: 5, seat: 5 },
    ],
    [
      { class: 5, row: 5, seat: 5 },
      { class: 14, row: 14 },
      { class: 9, row: 9, seat: 9 },
    ],
    [
      { class: 11, row: 11, seat: 11 },
      { class: 12, row: 12, seat: 12 },
      { class: 13, row: 13, seat: 13 },
    ]
  ];
  

  test('readInput - read input and parse each section', () => {
    expect(readInput("testInput.txt")).toEqual(dataset);
  });

  test('isValid - check if a given num is within range defined by fields ', () => {
    expect(isValid(dataset[0], 47)).toBeTruthy();
    expect(isValid(dataset[0], 55)).toBeFalsy();

  });

  test('part1 - calculate tickets error rate - the sum of all invalid numbers ', () => {
    expect(part1(dataset)).toBe(71);
  });

  test('ticketsFilter - filter valid tickets ', () => {
    expect(ticketsFilter(dataset[0], dataset[2])).toEqual([dataset[2][0]]);
  })

  test('fieldsMatch - match all possible fields for each number in a given ticket ', () => {
    expect(fieldsMatch(dataset[0], [7,1,14])).toEqual(dataset1);
  })

  test('commonFields - find common fields for numbers having the same order in all tickets ', () => {
    expect(commonFields(dataset2, 3)).toEqual([[["row"], ["class", "row"], ["class", "row", "seat"]], {row: 0}]);
  })

  test('findOrderedFields - find fields order that can apply to all tickets', () => {
    expect(findOrderedFields([["row"], ["class", "row"], ["class", "row", "seat"]], {row: 0})).toEqual({"row":0, "class":1, "seat":2});
  })
})
