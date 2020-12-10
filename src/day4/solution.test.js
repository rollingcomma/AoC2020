const { 
  readInput, 
  part1, 
  validByr, 
  validIyr, 
  validEyr,
  validHgt,
  validHcl,
  validEcl,
  validPid,
  part2 } = require('./functions');

describe('test day4 solution ', () => {
  const dataSet = [
    {
      ecl: "gry", 
      pid: "860033327", 
      eyr: "2020", 
      hcl: "#fffffd",
      byr: "1937", 
      iyr: "2017", 
      cid: "147", 
      hgt: "183cm"
    },
    {
      iyr: "2013", 
      ecl: "amb", 
      cid: "350", 
      eyr: "2023", 
      pid: "028048884",
      hcl: "#cfa07d", 
      byr: "1929"
    },
    {
      hcl: "#ae17e1", 
      iyr: "2013",
      eyr: "2024",
      ecl: "brn",
      pid: "760753108",
      byr: "1931",
      hgt: "179cm"
    },
    {
      hcl: "#cfa07d",
      eyr: "2025", 
      pid: "166559648",
      iyr: "2011",
      ecl: "brn", 
      hgt: "59in"
    }

  ];

  test('read input text file', () => {
    expect(readInput("testInput.txt")).toEqual(dataSet);
  });

  test('part1 - count the valid passports that contain all required fields', () => {
    expect(part1(dataSet)).toBe(2);
  });

  test('validByr - validate birthday', () => {
    expect(validByr("2002")).toBeTruthy();
    expect(validByr("2003")).toBeFalsy();
    expect(validByr("aaa")).toBeFalsy();
  });

  test('validIyr - validate issue year', () => {
    expect(validIyr("2012")).toBeTruthy();
    expect(validIyr("2022")).toBeFalsy();
    expect(validIyr("aaa")).toBeFalsy();
  });

  test('validEyr - validate expiration year', () => {
    expect(validEyr("2020")).toBeTruthy();
    expect(validEyr("2015")).toBeFalsy();
    expect(validEyr("aaa")).toBeFalsy();
  });

  test('validHgt - validate height', () => {
    expect(validHgt("150cm")).toBeTruthy();
    expect(validHgt("76in")).toBeTruthy();
    expect(validHgt("155")).toBeFalsy();
    expect(validHgt("77in")).toBeFalsy();
    expect(validHgt("58in")).toBeFalsy();
    expect(validHgt("149cm")).toBeFalsy();
    expect(validHgt("194cm")).toBeFalsy();
  });

  test('validHcl - validate hair color', () => {
    expect(validHcl("#234567")).toBeTruthy();
    expect(validHcl("1234567")).toBeFalsy();
    expect(validHcl("#12345g")).toBeFalsy();
  });

  test('validEcl - validate eye color', () => {
    expect(validEcl("brn")).toBeTruthy();
    expect(validEcl("abc")).toBeFalsy();
  });


  test('validPid - validate passport ID', () => {
    expect(validPid("123456789")).toBeTruthy();
    expect(validHcl("1234567")).toBeFalsy();
    expect(validHcl("0123456789")).toBeFalsy();
  });

  test('part2 - count valid passports with all required fields & valid field value', () => {
    expect(part2(readInput("validTestInput.txt"))).toBe(4);
    expect(part2(readInput("invalidTestInput.txt"))).toBe(0);
  });
})
