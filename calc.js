const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operador");
const clearButton = document.getElementById("clear-btn");
const allClearButton = document.getElementById("all-clear-button");
const decimalPoint = document.getElementById("decimal");
const equal = document.getElementById("equal");
const lastScreen = document.getElementById("last-operator");
const currentScreen = document.getElementById("current-operator");

let firstOperand = ""
let currentOperand = ""
let currentOperation = null
let shouldResetScreen = false

numberButtons.forEach((button) =>
  button.addEventListener("click", () => numberToScreen(button.textContent))
)

operationButtons.forEach((button) =>
  button.addEventListener("click", () => operatorToScreen(button.textContent))
)

equal.addEventListener("click", evaluate)

clearButton.addEventListener("click", () => {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1)
})

allClearButton.addEventListener("click", () => {
  currentScreen.textContent = "0"
  lastScreen.textContent = ""
  firstOperand = ""
  currentOperand = ""
  currentOperation = null
})

function numberToScreen(numero) {
  if (currentScreen.textContent === "0" || shouldResetScreen) {
    resetScreen()
  }
  currentScreen.textContent += numero
}

function operatorToScreen(operator) {
  if (currentOperation !== null) {
    evaluate()
  }
  firstOperand = currentScreen.textContent
  currentOperation = operator
  lastScreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function resetScreen() {
  currentScreen.textContent = ""
  shouldResetScreen = false
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) {
    return
  }
  if (currentOperation === "/" && currentScreen.textContent === "0") {
    alert("Sir, you cannot divide by 0.")
    return
  }
  currentOperand = currentScreen.textContent
  currentScreen.textContent = operate(currentOperation, firstOperand, currentOperand)
  lastScreen.textContent = `${firstOperand} ${currentOperation} ${currentOperand} =`
  currentOperation = null
}

function sum(a, b) {
  return a + b
}
function resta(a, b) {
  return a - b
}
function multiplication(a, b) {
  return a * b
}
function division(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case "+":
      return sum(a, b)
    case "-":
      return resta(a, b)
    case "*":
      return multiplication(a, b)
    case "/":
      if (b === 0) {
        return null
      } else {
        return division(a, b)
      }
    default:
      return null
  }
}