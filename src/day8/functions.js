const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n");
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const extractRules = (inputs) => {
  const pattern = /([\w\s]+)\sbags\scontain\s([\w\s,]+)./;
  let rules = {};
  inputs.forEach(input => {
    const [, root, properties] = pattern.exec(input);
    
    let props = {};
    properties
      .split(",")
      .map(p => {
        if (p.trim() && p.indexOf("no other bags") === -1) {
          const [, num, bag] = /(\d{1})\s([\w\s]+)\sbags{0,1}/.exec(p.trim())
          props[bag.replace(/\s/g, "_")] = parseInt(num);
        } else {
          props = null;
        }
      });
    rules =  { ...rules,...{[root.replace(/\s/g, "_")]: props }};
  });
  return rules;
}


const part1 = (inputs) => {
  let validRules = {};
  const rules = extractRules(inputs);
  for(const prop in rules) {
    if(rules[prop] && rules[prop]["shiny_gold"])
      validRules = { ...validRules, ...{ [prop]:rules[prop]} }
  }
  
  do {
    isFound = false;
    const keys = Object.keys(validRules);
    keys.forEach(key => {
      for (const prop in rules) {
        if (rules[prop] && rules[prop][key] && !validRules[prop]) {
          isFound = true;
          validRules = { ...validRules, ...{ [prop]: rules[prop]}}
        }
      }
    })
  } while(isFound);
  return Object.keys(validRules).length;
}

/**
 * Description: recursionally traverse rules which can be contained within shiny gold bag
 * count the number of bags every satisfied rule contains
 * if the bag is at the bottom level - can not contain other bags, count its quantity only
 * otherwise count its quantity plus the quantity times bags it contains inside
 * 
 * @param {*} key 
 * @param {*} rules 
 */
const countBags = ( key, rules) => {
  if(!rules[key]) return 1;

  let containBagCount = 0;
  for(const prop in rules[key]) {
    if(rules[prop]) { //not the bottom level
      containBagCount += rules[key][prop] * (countBags(prop, rules) + 1);
    } else { // bottom level
      containBagCount += rules[key][prop] * countBags(prop, rules);
    }
  }
  return containBagCount;
}

const part2 = (inputs) => {
  const rules = extractRules(inputs);
  return countBags("shiny_gold", rules);
} 

module.exports = {
  readInput, 
  extractRules,
  part1, 
  part2 }