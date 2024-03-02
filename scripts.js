let screenValue = document.querySelector('.result').textContent; // Holds initial display value - 0 should I replace this w/ screenElement.textContent?
let screenElement = document.querySelector('.result'); // Html element for initial display value
let screenEquationElement = document.querySelector('.equation'); // Html element for display equation 

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const decimal = document.querySelector('.dot');
const plus = document.querySelector('.plus');
const equal = document.querySelector('.equals');
const allClear = document.querySelector('.all-clear');
const clearEntry = document.querySelector('.clear-entry');


let counter = 0;
let firstNumber;
let secondNumber;
let buttonOperator;
let buttonOperatorEnd;

numbers.forEach((button) => {
  return button.addEventListener('click',function(event) { // Add event handlers to all numeric buttons
    let buttonNumber = this.children[0].textContent; // Take a value of clicked numeric button
    
    if(!screenEquationElement.textContent.split('').some(findOperator)) { // If equation hasn't got operator...
      screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Concatenate first number and removes first zero of a non-zero number
      screenElement.textContent = screenValue; // Update a screen with a new number value
      firstNumber = screenValue; // Assign screen value to variable 
    }
    else { // If equation contains operator...
      counter++; // Each number click once operator is present ups the counter to...
      if(counter === 1) { screenValue = '0'; } // Reset screen value only on first number btn click
      screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Concatenate second number and removes first zero of a non-zero number
      screenElement.textContent = screenValue; // Update a screen with a new number value
      secondNumber = screenValue; // Assign screen value to 2nd number variable 
    }
  });
});

decimal.addEventListener('click', function(event) { // Add event handler to "." button
  let decimalPoint = this.children[0].textContent; // Take a value of clicked "." button
  if(!screenValue.includes('.')) { screenValue = screenValue + decimalPoint; } // Add "." to a number only once
  screenElement.textContent = screenValue; // Update a screen with to display "." within a number
});

operators.forEach((button) => { // Add event handler to all operator buttons
  return button.addEventListener('click', function(event) {
    buttonOperatorEnd = this.children[0].textContent; // Take value of clicked operator button - backup
    if(!secondNumber) { // If second equation number hasn't been entered...
    buttonOperator = this.children[0].textContent; // Take value of clicked operator button - main
    }
    if(!screenEquationElement.textContent.split('').some(findOperator)) { // If equation doesn't have operator...
      screenEquationElement.textContent = screenValue + ' ' + buttonOperator + ' '; // Update screen with 1st number and operator
    }
    else if(!secondNumber) { // If second equation number hasn't been entered allow changing current operator
      let temp = screenEquationElement.textContent.split(''); // Turn to array
      temp.splice(-2,2,' ',buttonOperator); // Replace operator character
      screenEquationElement.textContent = temp.join(''); // Join back to string and update to a screen
    }
    else { // If both numbers and operator are present, calculate result on operator button click
      screenEquationElement.textContent = `${operate(firstNumber,secondNumber,buttonOperator)} ${buttonOperatorEnd}`; // Update equation with result
      screenElement.textContent = operate(firstNumber,secondNumber,buttonOperator); // Update  1st number with equation result
      screenValue = ''; // Prevent concatenation of 3rd number to 2nd one
      firstNumber = screenElement.textContent; // Assign calculated result to 1st number variable
      secondNumber = undefined; // Empty 2nd number value to allow chaining calculations
      if(firstNumber === screenElement.textContent) { // Allow changing operator for subsequent calculations
        buttonOperator = screenEquationElement.textContent.split('').splice(-1,1).join(''); // Turn to array, replace and join back to string
      }
    } 
  });
});

equal.addEventListener('click', function(event) { // Add event handler to "=" equals button
  if(secondNumber) { // If second equation number is present equals button click will...
  screenElement.textContent = operate(firstNumber,secondNumber,buttonOperator); // Update  1st number with equation result
  screenEquationElement.textContent = `${firstNumber} ${buttonOperator} ${secondNumber} =`; // Update equation with result and "="
  }
});

allClear.addEventListener('click', function(event) { // // Add event handler to "AC" button
  screenEquationElement.textContent = ''; // Empty equation and result elements
  screenElement.textContent = '0';
  screenValue = '0';
  firstNumber = 0; // Reset 1st number value
});

clearEntry.addEventListener('click', function(event) {
  let temp = screenEquationElement.textContent.split('');
  if(secondNumber && (temp[temp.length-1] !== '='))  { // If 2nd number is present and equation end with '=' clear 2nd number
    let temp = screenElement.textContent.split('');
    temp.pop();
    screenElement.textContent = temp.join('');
    secondNumber = screenElement.textContent;
    screenValue = screenElement.textContent; // delete later?
  } 
  else { // Otherwise clear 1st number
    let temp = screenElement.textContent.split('');
    temp.pop();
    screenElement.textContent = temp.join('');
    firstNumber = screenElement.textContent;
    screenValue = screenElement.textContent; // delete later?
  }
});

window.addEventListener('keypress', function(event) {
  let buttonNumber;
  if(event.code.charAt(event.code.length - 1).charCodeAt(0) >= 48 && // Display only keys between 0 an 9 according to ascii...
     event.code.charAt(event.code.length - 1).charCodeAt(0) <= 57) {
    switch(event.code.charAt(event.code.length - 1)) {
      case '1': buttonNumber = '1';
                break;
      case '2': buttonNumber = '2';
                break;
      case '3': buttonNumber = '3';
                break;
      case '4': buttonNumber = '4';
                break;
      case '5': buttonNumber = '5';
                break;
      case '6': buttonNumber = '6';
                break;
      case '7': buttonNumber = '7';
                break;
      case '8': buttonNumber = '8';
                break;
      case '9': buttonNumber = '9';
                break;
      case '0': buttonNumber = '0';
                break;
    }
  
    if(!screenEquationElement.textContent.split('').some(findOperator)) { // If equation hasn't got operator...
      screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Concatenate first number and removes first zero of a non-zero number
      screenElement.textContent = screenValue; // Update a screen with a new number value
      firstNumber = screenValue; // Assign screen value to variable 
    }
    else { // If equation contains operator...
      counter++; // Each number click once operator is present ups the counter to...
      if(counter === 1) { screenValue = '0'; } // Reset screen value only on first number btn click
      screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Concatenate second number and removes first zero of a non-zero number
      screenElement.textContent = screenValue; // Update a screen with a new number value
      secondNumber = screenValue; // Assign screen value to 2nd number variable 
    }
  }
});

function findOperator(operator) { // Used in .some() method to find presence of operator within equation
  return operator === '%' || operator === '÷' || operator === '×' || operator === '-' || operator === '+';
}

function operate(num1,num2,operator) { // Call function based on operator value
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
  return Number(num1) + Number(num2); // Turn to number to prevent string concatenation
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

