
let screenValue = document.querySelector('.result').textContent; // Holds initial display value - 0
let screenElement = document.querySelector('.result'); // Holds html element with initial display value

const numbers = Array.from(document.querySelectorAll('.number'));
const dot = document.querySelector('.dot');

numbers.forEach((button) => {
  return button.addEventListener('click',function(event) { // Adds event handler to all numeric buttons
    let buttonValue = this.children[0].textContent; // Takes a value of clicked numeric button
    screenValue != '0' ? screenValue = screenValue + buttonValue : screenValue = (screenValue + buttonValue).slice(1); // Removes first zero of a non-zero number
    screenElement.textContent = screenValue; // Updates a screen with a new number value
  });
});

dot.addEventListener('click', function(event) { // Adds event handler to "dot" button
  let buttonValue = this.children[0].textContent; // Takes a value of clicked "dot" button
  if(!screenValue.includes('.')) { screenValue = screenValue + buttonValue; }// Adds "." to a number only once
  screenElement.textContent = screenValue; // Updates a screen with a new number value
});

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