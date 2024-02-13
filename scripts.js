// numbers.forEach((button) => {
//   return button.addEventListener('click',function(event) { // Adds event handler to all numeric buttons
//     let buttonNumber = this.children[0].textContent; // Takes a value of clicked numeric button
//     screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Removes first zero of a non-zero number
//     screenElement.textContent = screenValue; // Updates a screen with a new number value
//   });
// });

let screenValue = document.querySelector('.result').textContent; // Holds initial display value - 0
let screenElement = document.querySelector('.result'); // Html element for initial display value
let screenEquationValue = document.querySelector('.equation').textContent; // Holds initial display equation 
let screenEquationElement = document.querySelector('.equation'); // Html element for display equation 

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const decimal = document.querySelector('.dot');
const plus = document.querySelector('.plus');



numbers.forEach((button) => {
  return button.addEventListener('click',function(event) { // Adds event handler to all numeric buttons
    let buttonNumber = this.children[0].textContent; // Takes a value of clicked numeric button
    screenValue != '0' ? screenValue = screenValue + buttonNumber : screenValue = (screenValue + buttonNumber).slice(1); // Removes first zero of a non-zero number
    screenElement.textContent = screenValue; // Updates a screen with a new number value
  });
});

decimal.addEventListener('click', function(event) { // Adds event handler to "dot" button
  let decimalPoint = this.children[0].textContent; // Takes a value of clicked "dot" button
  if(!screenValue.includes('.')) { screenValue = screenValue + decimalPoint; } // Adds "." to a number only once
  screenElement.textContent = screenValue;
});

operators.forEach((button) => { // Adds event handler to all operator buttons
  return button.addEventListener('click', function(event) {
      
    let buttonOperator = this.children[0].textContent; // Takes a value of clicked operator button

    if(!screenEquationElement.textContent.split('').some(findOperator)) { // If equation doesn't have operator -> update number + operator
      screenEquationElement.textContent = screenValue + ' ' + buttonOperator + ' '; // This stops from updating to zero on same operator click
      screenValue = '0'; // But other operator clicks should update only the operator and keep the number - doesn't happen!!!!
    }
    else {
      let temp = screenEquationElement.textContent.split(''); // Turned to array to apply splice() and replace current operator with new
      temp.splice(-2,1,buttonOperator);
      screenEquationElement.textContent = temp.join('');
    }
    function findOperator(operator) {
      return operator === '%' || operator === '÷' || operator === '×' || operator === '-' || operator === '+' || operator === '=';
    }
  });
});

// CALCULATE EQUATION
// 1) If equation is finished (e.g ends with number), operator btn click calculates it using functions below
// 2) Which function is applied is determined by operator within equation - .includes()?
// 3) Operands from equation are isolated passed as parameters into function - loop through equation as string or turn in into array?
// 4) Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.



function add(num1,num2) {
  return num1 + num2;
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