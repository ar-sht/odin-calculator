// Gets each button from DOM
const buttons = [...document.querySelectorAll('div.control-panel > button.button')];
const mainDisplay = document.querySelector('div#display > h3.main')
const subDisplay = document.querySelector('div#display > h5.sub')
const goodStuff = {
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'zero',
  '6': 'one',
  '7': 'two',
  '8': 'three',
  '9': 'four',

  '+': 'plus',
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '^': 'power',
  '?': 'astley',

  '=': 'equals',

  'Backspace': 'delete',
  'Escape': 'clear',
}

let num1 = 0;
let num2 = 0; 
let total = 0;
let op = '';
let toMain = '';
let toSub = '';

function roundLongDecimals(answer) {
  if (answer.toString().indexOf('.') !== -1) {
    if (answer.toString().split('.')[1].length > 5) {
      return answer.toFixed(5);
    }
  }
  return answer;
}

function add(x, y) {
  return roundLongDecimals(x + y);
}

function subtract(x, y) {
  return roundLongDecimals(x - y);
}

function multiply(x, y) {
  return roundLongDecimals(x * y);
}

function divide(x, y) {
  return roundLongDecimals(x / y);
}

function power(x, y) {
  let total = 1;
  for (let i = 0; i < y; i++) {
    total *= x;
  }
  return roundLongDecimals(total);
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
  if (value.classList.contains('number') || value.classList.contains('decimal')) {
    toMain += value.textContent;
  } else if (value.classList.contains('operation')) {
    toSub += mainDisplay.textContent + value.textContent;
    toMain = '';
    num1 = total;
    num2 = 0;
    document.querySelector('.decimal').removeAttribute('disabled');
  } else if (value.classList.contains('power')) {
    toSub += mainDisplay.textContent + '^';
    toMain = '';
    num1 = total;
    num2 = 0;
  } else if (value.classList.contains('equals')) {
    let extra = '';
    if (mainDisplay.textContent === '') {
      extra = '0';
    }
    toSub += mainDisplay.textContent + extra + '=';
    toMain = total;
  } else if (value.classList.contains('clear')) {
    toMain = '';
    toSub = '';
    num1 = 0;
    num2 = 0;
    total = '0'
    op = '';
  } else if (value.classList.contains('delete')) {
    if (toMain.includes('.') && toMain[toMain.length - 1] !== '.') {
      if (op === '') {
        num1 -= parseInt(toString(num1)[toString(num1).length - 1]) / power(10, ((toMain.split('.')[1]).length))
      } else {
        num2 -= parseInt(toString(num2)[toString(num2).length - 1]) / power(10, ((toMain.split('.')[1]).length))
      }
    } else if (!toMain.includes('.') && toMain[toMain.length - 1] !== '.') {
      if (op === '') {
        num1 = (num1 - parseInt(toString(num1)[toString(num1).length - 1])) / 10
      } else {
        num2 = (num2 - parseInt(toString(num2)[toString(num2).length - 1])) / 10
      }
    }
    toMain = mainDisplay.textContent.slice(0, -1);
  }
  mainDisplay.textContent = toMain;
  subDisplay.textContent = toSub;
}

buttons.forEach(function (button) {
  if (button.classList.contains('number')) {
    button.addEventListener('click', function() {
      updateDisplay(button);
      if (!toMain.includes('.')) {
        if (op === '') {
          num1 = (num1 * 10) + parseInt(button.textContent);
          total = num1;
        } else {
          num2 = (num2 * 10) + parseInt(button.textContent);
          total = operate(op, num1, num2);
        }
      } else {
        if (op === '') {
          num1 += parseInt(button.textContent) / power(10, ((toMain.split('.')[1]).length))
          total = num1;
        } else {
          num2 += parseInt(button.textContent) / power(10, ((toMain.split('.')[1]).length))
          total = operate(op, num1, num2);
        }
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
          if (!button.classList.contains('clear') && !button.classList.contains('astley')) {
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
