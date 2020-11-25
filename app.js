//Getting DOM elememnt from HTML to manipulate
const memoryText = document.querySelector("[data-memory]");
const memoryClear = document.querySelector("[data-memory-clear]");
const memoryReset = document.querySelector("[data-memory-reset]");
const memoryCompute = document.querySelectorAll("[data-memory-compute]");
const currentOperandText = document.querySelector("[data-current-operand]");
const delBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const switchSignBtn = document.querySelector("[data-switch]");
const equalBtn = document.querySelector("[data-equal]");
const operationBtn = document.querySelectorAll("[data-operation]");
const numberBtn = document.querySelectorAll("[data-number]");

//Initiallization
let memory = "";
let operation = "";
let currentOperand = "";
let prevOperand = "";

//Functions
//Update every changes
function updateDisplay() {
  if (operation != "") {
    currentOperandText.innerText = prevOperand + operation + currentOperand;
  } else {
    currentOperandText.innerText = currentOperand;
  }

  if (memory != "") {
    memoryText.innerText = `M=${memory}`;
  }
}
//To append number
function appendNumber(number) {
  if (currentOperand.includes(".") && number == ".") return;
  if (currentOperand == 0) {
    currentOperand = number;
  } else {
    currentOperand = currentOperand + number;
  }
  updateDisplay();
}
//Choosing Operation then change value of operand
function chooseOperation(opt) {
  if (currentOperand == "") return;
  if (operation != "") {
    compute();
  }
  operation = opt;
  prevOperand = currentOperand;
  currentOperand = "";

  updateDisplay();
}
// Computing prev and current operand
function compute() {
  let res;

  if (prevOperand == "" || currentOperand == "") return;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  switch (operation) {
    case "+":
      res = prev + current;
      break;
    case "-":
      res = prev - current;
      break;
    case "×":
      res = prev * current;
      break;
    case "÷":
      res = prev / current;
      break;

    default:
      break;
  }
  if (res == 0) {
    console.log("zero");
  }
  res = res.toString();
  memory = res;
  currentOperand = res;
  prevOperand = "";
  operation = "";

  updateDisplay();
}

//Compute using memory
function computeMemory(text) {
  let res;
  if (memory == "") return;

  if (text.includes("+")) {
    res = parseFloat(memory) + parseFloat(currentOperand);
  } else if (text.includes("-")) {
    res = parseFloat(memory) - parseFloat(currentOperand);
  }
  res = res.toString();
  memory = res;
  currentOperand = res;

  updateDisplay();
}
//Clear all text/value
function clearText() {
  currentOperand = "0";
  prevOperand = "";
  operation = "";
  // currentOperandText.innerText = "0";
  updateDisplay();
}
//Delete value/text from the end of string
function deleteText() {
  if (currentOperandText.innerText == "0") return;
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperandText.innerText.length == 1) {
    currentOperand = "0";
  }
  updateDisplay();
}

//Event Listeners
numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    appendNumber(btn.innerText);
  });
});
operationBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    chooseOperation(btn.innerText);
  });
});

equalBtn.addEventListener("click", () => {
  compute();
});

memoryClear.addEventListener("click", () => {
  memory = "";
  memoryText.innerText = "M=0";
});

memoryCompute.forEach((btn) => {
  btn.addEventListener("click", () => {
    computeMemory(btn.innerText);
  });
});

clearBtn.addEventListener("click", clearText);
delBtn.addEventListener("click", deleteText);
