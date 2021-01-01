const fs = require('fs');

const readInput = (file) => {
  try {
    return fs.readFileSync(`${__dirname}/${file}`, 'utf8')
      .split("\n")
      .map(input => input.match(/[\d()+*]/g));
  } catch (ex) {
    console.log("error read file", ex.message)
  }
}

const calculate = (operatorStack, operandStack) => {
  const operator = operatorStack.pop();
  const operand2 = parseInt(operandStack.pop());
  const operand1 = parseInt(operandStack.pop());

  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "*":
      return operand1 * operand2;
  }
}

const evaluate1 = (expression) => {
  let operatorStack = [], operandStack = [];
  expression.forEach(item => {
    switch(item) {
      case "(": {
        operatorStack.push(item);
        break;
      }
      case ")": {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length-1] !== "(" ) {
          operandStack.push(calculate(operatorStack, operandStack));
        }
        if(operatorStack.length > 0) operatorStack.pop();
        break;
      }
      case "+": //fall through
      case "*": {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length-1] !== "(") {
          operandStack.push(calculate(operatorStack, operandStack));
        }
        operatorStack.push(item);
        break;
      }
      default: operandStack.push(item);
    }
  });
  
  while(operatorStack.length > 0) {
    operandStack.push(calculate(operatorStack, operandStack));
  }
  return operandStack[0];
}

const evaluate2 = (expression) => {
  let operatorStack = [], operandStack = [];
  expression.forEach(item => {
    switch (item) {
      case "(": {
        operatorStack.push(item);
        break;
      }
      case ")": {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
          operandStack.push(calculate(operatorStack, operandStack));
        }
        if (operatorStack.length > 0) operatorStack.pop();
        break;
      }
      case "+": {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === "+") {
          operandStack.push(calculate(operatorStack, operandStack));
        }
        operatorStack.push(item);
        break;
      }
      case "*": {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
          operandStack.push(calculate(operatorStack, operandStack));
        }
        operatorStack.push(item);
        break;
      }
      default: operandStack.push(item);
    }
  });

  while (operatorStack.length > 0) {
    operandStack.push(calculate(operatorStack, operandStack));
  }
  return operandStack[0];
}

const part1 = (inputs) => {
  let results = [];
  inputs.forEach(input => {
    results.push(evaluate1(input));
  });
  return results.reduce((acc, current) => acc + current, 0);
}

const part2 = (inputs) => {
  let results = [];
  inputs.forEach(input => {
    results.push(evaluate2(input));
  });
  return results.reduce((acc, current) => acc + current, 0);
} 

module.exports = {
  readInput,
  evaluate1,
  evaluate2,
  part1, 
  part2 }