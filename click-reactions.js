// Gets each button from DOM
const buttons = [...document.querySelectorAll('div.control-panel > button.button')];
const mainDisplay = document.querySelector('div#display > h3.main')
const subDisplay = document.querySelector('div#display > h5.sub')

let num1 = 0;
let num2 = 0; 
let op = '';
let toMain = '';
let toSub = '';

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function power(x, y) {
  let total = 1;
  for (let i = 0; i < y; i++) {
    total *= x;
  }
  return total;
}

function operate(op, x, y) {
  if (op === "plus") {
    return add(x, y);
  } else if (op === "minus") {
    return subtract(x, y);
  } else if (op === "multiply") {
    return multiply(x, y);
  } else if (op === "divide") {
    return divide(x, y);
  } else if (op === "power") {
    return power(x, y)
  }
}

function updateDisplay(value) {
  if (value.classList.contains('number')) {
    toMain += value.textContent;
  } else if (value.classList.contains('operation')) {
    toSub += mainDisplay.textContent + value.textContent;
    toMain = '';
  } else if (value.classList.contains('power')) {
    toSub += mainDisplay.textContent + '^';
    toMain = '';
  } else if (value.classList.contains('equals')) {
    let extra = '';
    if (mainDisplay.textContent === '') {
      extra = '0'
    }
    toSub += mainDisplay.textContent + extra + '='
    toMain = operate(op, num1, num2);
  } else if (value.classList.contains('clear')) {
    toMain = '';
    toSub = '';
    num1 = 0;
    num2 = 0;
    op = '';
  } else if (value.classList.contains('delete')) {
    toMain = mainDisplay.textContent.slice(0, -1);
  }
  mainDisplay.textContent = toMain;
  subDisplay.textContent = toSub;
}

buttons.forEach(function (button) {
  if (button.classList.contains('number')) {
    button.addEventListener('click', function() {
      updateDisplay(button);
      if (op === '') {
        num1 = (num1 * 10) + parseInt(button.textContent);
      } else {
        num2 = (num2 * 10) + parseInt(button.textContent);
      }
    })
  } else if (button.classList.contains('operation') || button.classList.contains('power')) {
    button.addEventListener('click', function () {
      updateDisplay(button);
      op = button.id;
    })
  } else if (button.classList.contains('equals')) {
    button.addEventListener('click', function () {
      if (op !== '' && !(op === 'divide' && num2 === 0) && !subDisplay.textContent.includes('=')) {
        updateDisplay(button);
        buttons.forEach(function (button) {
          if (!button.classList.contains('clear')) {
            button.setAttribute('disabled', 'true')
          }
        })
      } else {
        mainDisplay.textContent = "YER DUM.";
        subDisplay.textContent = "HEY!"
      }
    })
  } else if (button.classList.contains('clear')) {
    button.addEventListener('click', function () {
      updateDisplay(button);
      buttons.forEach(function (button) {
        button.removeAttribute('disabled')
      })
    })
  } else if (button.classList.contains('delete')) {
    button.addEventListener('click', function () {
      updateDisplay(button);
    })
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', function () {
      updateDisplay(button);
      button.toggleAttribute('disabled')
    })
  } else if (button.classList.contains('astley')) {
    button.addEventListener('click', function () {
      document.body.innerHTML = "<video autoplay src=\"inconspicous-file.mp4\" style=\"width:100%;\">"
    })
  }
})
