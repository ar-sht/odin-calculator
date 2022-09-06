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


function operate(op, x, y) {
  if (op === "+") {
    return add(x, y);
  } else if (op === "-") {
    return subtract(x, y);
  } else if (op === "*") {
    return multiply(x, y);
  } else if (op === "/") {
    return divide(x, y);
  }
}