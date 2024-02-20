let screenValue = document.querySelector('.result').textContent; // Holds initial display value - 0
let screenElement = document.querySelector('.result'); // Html element for initial display value
let screenEquationValue = document.querySelector('.equation').textContent; // Holds initial display equation - isn't used, delete?
let screenEquationElement = document.querySelector('.equation'); // Html element for display equation 

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const decimal = document.querySelector('.dot');
const plus = document.querySelector('.plus');
const equal = document.querySelector('.equals');

let counter = 0;
let firstNumber;
let secondNumber;
let buttonOperator;
let buttonOperatorEnd;

numbers.forEach((button) => {
  return button.addEventListener('click',function(event) { // Adds event handler to all numeric buttons
    let buttonNumber = this.children[0].textContent; // Takes a value of clicked numeric button

    if(!screenEquationElement.textContent.split('').some(findOperator)) { // If equation is empty...
      screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Removes first zero of a non-zero number
      screenElement.textContent = screenValue; // Updates a screen with a new number value
      firstNumber = screenValue;
    }
    else { // If equation contains operator...
      counter++;
      if(counter === 1) { screenValue = '0'; } // Reset screen value, but only once, so that concatenation works
      screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Removes first zero of a non-zero number
      screenElement.textContent = screenValue; // Updates a screen with a new number value
      secondNumber = screenValue;
    }
  });
});

decimal.addEventListener('click', function(event) { // Adds event handler to "dot" button
  let decimalPoint = this.children[0].textContent; // Takes a value of clicked "dot" button
  if(!screenValue.includes('.')) { screenValue = screenValue + decimalPoint; } // Adds "." to a number only once
  screenElement.textContent = screenValue;
});

operators.forEach((button) => { // Adds event handler to all operator buttons
  return button.addEventListener('click', function(event) {
    buttonOperatorEnd = this.children[0].textContent;
    if(!secondNumber) { // Allow changing operators until second number is entered  
    buttonOperator = this.children[0].textContent; // Takes a value of clicked operator button until second number is entered
    }
    if(!screenEquationElement.textContent.split('').some(findOperator)) { // If equation doesn't have operator/empty -> update number + operator
      screenEquationElement.textContent = screenValue + ' ' + buttonOperator + ' '; // This stops from updating to zero on same operator click
    }
    else if(!secondNumber) { // Must be changed to else if() checking presence of operator in equation and that 2nd num variable is '' / undefined
      let temp = screenEquationElement.textContent.split(''); // Turned to array to apply splice() and replace current operator with new
      temp.splice(-2,1,buttonOperator);
      screenEquationElement.textContent = temp.join('');
    }
    else {
      screenEquationElement.textContent = `${operate(firstNumber,secondNumber,buttonOperator)} ${buttonOperatorEnd}`;
      screenElement.textContent = operate(firstNumber,secondNumber,buttonOperator);
      screenValue = ''; // Prevent 3rd number concatenation to the 2nd
      firstNumber = screenElement.textContent; // Updates first number to equation result
      if(firstNumber === screenElement.textContent) { // change operator for subsequent number calculations
        buttonOperator = screenEquationElement.textContent.split('').splice(-1,1).join('');
      }
    } 
  });
});

equal.addEventListener('click', function(event) {
  screenElement.textContent = operate(firstNumber,secondNumber,buttonOperator);
  screenEquationElement.textContent = `${firstNumber} ${buttonOperator} ${secondNumber} =`;
});

// CONTINUING CALCULATION
// 1)Bug: Second numbers of first calculation concatenates with number for next calculation (e.g. 5 + 6 - 3 -> 63)
//   Second number isn't reset after calculation, so it is being concatenated to
// 2)Bug: Concatenated number is calculated with first number of initial equation (e.g. 6 + 5 - 2 -> 6 + 53)
//   Following calculation still used operator of first calculation - should change
//   When 1st number takes value of equation's calculation, change button operator value to equations last char

function operate(num1,num2,operator) {
  switch (operator) {
    case '+':
      return add(num1,num2);
    case '-':
      return subtract(num1,num2);
    case '×':
      return multiply(num1,num2);
    case '÷':
      return divide(num1,num2);
    case '%':
      return percentage(num1,num2);
  }
}

function add(num1,num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1,num2) {
  return num1 - num2;
}

function multiply(num1,num2) {
  return num1 * num2;
}

function divide(num1,num2) {
  return num1 / num2;
}

function percentage(num1,num2) {
  return num1 / 100 * num2;
}

function findOperator(operator) {
  return operator === '%' || operator === '÷' || operator === '×' || operator === '-' || operator === '+' || operator === '=';
}