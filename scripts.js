let firstNumber = ''; // holds first number value
let secondNumber = ''; // holds second number value
let operator = null; // holds operator value
let resetToggle = false; // primes first number emptying

const screenNumber = document.querySelector('.result'); // html element for screen number value
const screenEquation = document.querySelector('.equation'); // html element for screen equation value
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equals');
const clearEntryButton = document.querySelector('.clear-entry'); // CE
const allClearButton = document.querySelector('.all-clear'); // AC
const decimalButton = document.querySelector('.dot');
const negativeButton = document.querySelector('.negative'); // add later!

window.addEventListener('keydown', manageKeyInput);
equalButton.addEventListener('click', calculate);
clearEntryButton.addEventListener('click', clearEntry);
allClearButton.addEventListener('click', clearAll);
decimalButton.addEventListener('click', addDecimal);
negativeButton.addEventListener('click', addMinus);

numberButtons.forEach((button) => // attach click handler with its function to all number buttons
  button.addEventListener('click', () => concatNumber(button.textContent)) 
);
operatorButtons.forEach((button) => // attach click handler with its function to all operator buttons
  button.addEventListener('click', () => setOperation(button.textContent))
); 

function concatNumber(number) {
  if(screenNumber.textContent === '0' || resetToggle) { resetNumber() } // empty screen value to: remove 0 before entering 1st num or remove 1st num before entering 2nd num
  if(!screenEquation.textContent.includes('=')) { // concatenate clicked/pressed number to emptied screen value if screenNumber isn't equation result
  screenNumber.textContent += number; 
  }
} 

function resetNumber() {
  screenNumber.textContent = ''; // empty screen value to: remove 0 before entering 1st num or remove 1st num before entering 2nd num
  resetToggle = false; // reset toggle to allow entering new number on subsequent operator click
}

function addDecimal() {
  if(resetToggle) { resetNumber() } // empty screen number so that '.' is added to 2nd number instead of 1st
  if(screenEquation.textContent.includes('=')) { // prevent adding '.' to result of equation, instead add '.' to following number
    resetNumber();
    screenEquation.textContent = '';
  }
  if(screenNumber.textContent === '') { screenNumber.textContent = '0' } // make screen value 0 if adding '.'
  if(screenNumber.textContent.includes('.')) { return } // do nothing if '.' is already present
  screenNumber.textContent += '.'; // concatenate '.' to screen value of '0'
} 

function clearEntry() {
  if(!resetToggle && !screenEquation.textContent.includes('=')) { 
    screenNumber.textContent = screenNumber.textContent.slice(0,-1); // delete last char of screenNumber if: 1st num is set via setOperation() and screenNumber isn't equation result
   } 
}

function clearAll() { // reset all values to initial state
  screenEquation.textContent = '';
  screenNumber.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  operator = null;
}

function transformOperator(keyboardInput) { // convert operator key/click inputs to display differently on screen
  if(keyboardInput === '*') { return '×' }  // '*' displays as '×'
  if(keyboardInput === '/') { return '÷' }  // '/' displays as '÷'
  if(keyboardInput === '+') { return '+' }
  if(keyboardInput === '-') { return '-' }
  if(keyboardInput === '%') { return '%' }
}

function setOperation(changedOperator) { 
  if(operator !== null) { calculate() } // calculate equation on subsequent operator click
  operator = changedOperator; // assign converted operator value to operator variable
  if(screenNumber.textContent.charAt(screenNumber.textContent.length - 1) === '.') { // if 1st num ends on '.', display it in equation without the '.'
    screenNumber.textContent = screenNumber.textContent.slice(0,-1)
  }
  firstNumber = screenNumber.textContent; // first number takes screen value or equation result value for subsequent operation
  screenEquation.textContent = `${firstNumber} ${operator}`; // update equation screen with first num and operator
  resetToggle = true; // prime screen value to be reset on entry of 2nd number
}

function calculate() {
  if(operator === null || resetToggle) { return } // calculate equation on subsequent operator click or on 'Enter / =' if 2nd number is present
  if(screenNumber.textContent.charAt(screenNumber.textContent.length - 1) === '.') { // if 2nd num ends on '.', display it in equation without the '.'
    screenNumber.textContent = screenNumber.textContent.slice(0,-1)
  }
  secondNumber = screenNumber.textContent; // assign screen value to 2nd num var once 1st num and operator are set via setOperation()
  screenNumber.textContent = floatingPointFix(operate(firstNumber,secondNumber,operator)); // update screen value with equation result
  secondNumber.includes('-') ? 
    screenEquation.textContent = `${firstNumber} ${operator} (${secondNumber}) =` : // display equation w/ brackets around 2nd number if it's negative
    screenEquation.textContent = `${firstNumber} ${operator} ${secondNumber} =`; // display equation as is
  operator = null;
}

function manageKeyInput(event) { // manage key input (not clicks)
  if(event.key >= 0 && event.key <= 9) { concatNumber(event.key) } // concatenate to current number if key is 0 to 9 
  if(event.key === '.') { addDecimal() } // concatenate '.' it to current number if key is '.'
  if(event.key === 'Enter') { calculate() } // calculate equation if key is 'Enter'
  if(event.key === 'Backspace') { clearEntry() } // delete last char of current number if key is 'Backspace'
  if(event.key === 'Escape') { clearAll() } // reset current number and equation if key is 'Escape'
  if(event.key === '%' || event.key === '*' || event.key === '/' || event.key === '+' || event.key === '-') { 
    setOperation(transformOperator(event.key)); // change key operator value to display version and pass it to setOperation()
  }
}

function floatingPointFix(number) { 
  return Math.round(number * 1000) / 1000; // fix floating point rounding error with 3 decimal point precision
}

function addMinus() {
  if(screenNumber.textContent.includes('-')) { return } // add '-' only once per number
  if(screenNumber.textContent !== '0' && !resetToggle && !screenEquation.textContent.includes('=')) { // don't add '-' if screenNumber is  0  
    screenNumber.textContent = `-${screenNumber.textContent}`; // don't add '-' if 1st num and operator are set; screenNumber shows equation result
  }
}

function operate(num1,num2,operator) { // call one of functions based on operator value
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
  return Number(num1) + Number(num2); // turn to number to add instead of concatenation
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
  let result = num1 / 100 * num2;
  return result;
}

