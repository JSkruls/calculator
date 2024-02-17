let screenValue = document.querySelector('.result').textContent; // Holds initial display value - 0
let screenElement = document.querySelector('.result'); // Html element for initial display value
let screenEquationValue = document.querySelector('.equation').textContent; // Holds initial display equation 
let screenEquationElement = document.querySelector('.equation'); // Html element for display equation 

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const decimal = document.querySelector('.dot');
const plus = document.querySelector('.plus');

let counter = 0;
let firstNumber;
let secondNumber;
let buttonOperator;


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
      screenEquationElement.textContent = operate(firstNumber,secondNumber,buttonOperator);
    } 
  });
});

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