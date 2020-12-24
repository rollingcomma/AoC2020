const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n\n")
      .map((input, index) => {
        switch (index) {
          case 0: {
            let fields = {};
            input
            .split("\n")
            .forEach(row => {
              const pattern = /([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)/g
              const [,field, firstLower,firstUpper, secondLower,secondUpper] = pattern.exec(row);
               fields[field] = { 
                                  first: [parseInt(firstLower), parseInt(firstUpper)], 
                                  second: [parseInt(secondLower), parseInt(secondUpper)] }
            });
            return fields;
          }
          case 1: {
            return  input
                    .split("\n")[1]
                    .split(",")
                    .map(num => parseInt(num))
          }
          case 2: {
            return  input
                    .split("\n")
                    .filter((row, index) => index!==0)
                    .map(row => row.split(",").map(num => parseInt(num)))
          }
        }
      });
  } catch (ex) {
    console.log("error read file", ex.message)
  }
};

/**
 * Description: check if a given number is valid for any rule from given fields list
 * 
 * @param {object} fields 
 * @param {int} num 
 * 
 * @returns{bool} 
 */
const isValid = (fields, num) => {
  for(const field in fields) {
    if (num >= fields[field]["first"][0] && num <= fields[field]["first"][1] 
       || num >= fields[field]["second"][0] && num <= fields[field]["second"][1])
    return true;
  }
  return false;
};

const part1 = (inputs) => {
  let invalid = {}, errRate = 0;
  const [fields, yourTicket, nearbyTickets] = inputs;
  nearbyTickets.forEach( ticket => {
    ticket.forEach(num => {
      if (invalid[num]) {
        invalid[num]++;
      } else if (!isValid(fields, num)) {
        invalid[num] = 1;
      }
    });
  });
  
  for(const [key, value] of Object.entries(invalid)) {
    errRate += parseInt(key) * value;
  }
  return errRate;
};

/**
 * Description: filter valid tickets - all numbers are valid to at least one field rule
 * 
 * @param {object} fields 
 * @param {2D array} tickets 
 * 
 * @returns {2D array} valid tickets
 */
const ticketsFilter = (fields, tickets) => {
  return tickets.filter(ticket => {
    let valid = true;
    for(const num of ticket) {
      if (!isValid(fields, num)) {
        valid = false;
        break;
      }
    }
    return valid;
  });
};

/**
 * Description: match all possible fields for each number in a given ticket
 * 
 * @param {object} fields 
 * @param {array} ticket 
 * 
 * @returns {object} matchFields
 */
const fieldsMatch = (fields, ticket) => {
  return ticket.map(num => {
    let matchFields = {};
    for (const field in fields) {
      if (num >= fields[field]["first"][0] && num <= fields[field]["first"][1]
        || num >= fields[field]["second"][0] && num <= fields[field]["second"][1])
        matchFields[field] = num;
    }
    return matchFields;
  }); 
}

/**
 * Description: find common fields for numbers having the same order in all tickets
 * 
 * @param {2D array} matchFieldsTickets - element is object
 * @param {int} fieldsLength 
 * 
 * @returns {array} with two elements 
 * - {2D array} comFieldsMatrix 
 * - {object} orderedFieldKey
 */
const commonFields = (matchFieldsTickets, fieldsLength) => {
  let orderedFieldKey = {}, comFieldsMatrix = [];
  for (let i = 0; i < fieldsLength; i++) {
    const commonFields = Object.keys(matchFieldsTickets[0][i]);
    const filteredFields = commonFields.filter(field => {
      for (let j = 1, length = matchFieldsTickets.length; j < length; j++) {
        if (!matchFieldsTickets[j][i][field]) return false;
      }
      return true;
    })
    if (filteredFields.length === 1) {
      orderedFieldKey[filteredFields[0]] = i;
    }
    comFieldsMatrix.push(filteredFields);
  }
  return [comFieldsMatrix, orderedFieldKey];
}

/**
 * Description: Find fields order that can apply to all tickets
 * 
 * @param {2D array} commonFieldsMatrix 
 * @param {object} orderedFieldKey
 * 
 * @returns {object} orderedFields - {field-name: index}
 */
const findOrderedFields = (commonFieldsMatrix, orderedFieldKey) => {
  let isReducing, res = commonFieldsMatrix;
  do {
    isReducing = false;
    const reducedFieldsMatrix = res.map((fields, i) => {
      let reducedFields;
      if (fields.length > 1) {
        reducedFields = fields.filter(field => !orderedFieldKey.hasOwnProperty(field));
      } else {
        reducedFields = [...fields];
      }
      if (reducedFields.length === 1) {
        if (!orderedFieldKey.hasOwnProperty(reducedFields[0])) {
          orderedFieldKey[reducedFields[0]] = i;
          isReducing = true;
        }
      } 
      return reducedFields;
    })
    res = JSON.parse(JSON.stringify(reducedFieldsMatrix));
  } while(isReducing);
  return orderedFieldKey;

  /* recursion way
  let isReducing = false;
  const reducedFieldsMatrix = commonFieldsMatrix.map((fields, i) => {
    let reducedFields;
    if (fields.length > 1) {
      reducedFields = fields.filter(field => !orderedFieldKey.hasOwnProperty(field));
    } else {
      reducedFields = [...fields];
    }
    if (reducedFields.length === 1) {
      if (!orderedFieldKey.hasOwnProperty(reducedFields[0])) {
        orderedFieldKey[reducedFields[0]] = i;
        isReducing = true;
      }
    }
    return reducedFields;
  })
  if (isReducing) findOrderedFields(reducedFieldsMatrix, orderedFieldKey);
  else return reducedFieldsMatrix;
  */
}

const part2 = (inputs) => {
  const [fields, yourTicket, nearbyTickets] = inputs;
  let matchFieldsTickets = [];
  //filter valid tickets 
  const validTickets = ticketsFilter(fields, nearbyTickets);
  //match number of tickets with all possible fields
  validTickets.forEach(ticket => {
    matchFieldsTickets.push(fieldsMatch(fields, ticket));
  });
  //find common fields for numbers having the same order in all tickets
  const [commonFieldsMatrix, orderedFieldKey] = commonFields(matchFieldsTickets, yourTicket.length);
  
  const orderedFields = findOrderedFields(commonFieldsMatrix, orderedFieldKey);
  let res = 1;
  for (const [key, value] of Object.entries(orderedFields)) {
    if (key.startsWith("departure")) {
      res *= yourTicket[value];
    }
  }
  return res;
}


module.exports = {
  readInput, 
  isValid,
  part1, 
  ticketsFilter,
  fieldsMatch,
  commonFields,
  findOrderedFields,
  part2 }