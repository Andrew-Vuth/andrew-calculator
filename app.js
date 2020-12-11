//Getting DOM elememnt from HTML to manipulate
const memoryText = document.querySelector("[data-memory]");
const memoryClear = document.querySelector("[data-memory-clear]");
const memoryRecall = document.querySelector("[data-memory-recall]");
const memoryCompute = document.querySelectorAll("[data-memory-compute]");
const currentOperandText = document.querySelector("[data-current-operand]");
const delBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const switchSignBtn = document.querySelector("[data-switch]");
const equalBtn = document.querySelector("[data-equal]");
const operationBtn = document.querySelectorAll("[data-operation]");
const numberBtn = document.querySelectorAll("[data-number]");

//Initiallization
let memory = "0";
let operation = "";
let currentOperand = "0";
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
  if (currentOperand == 0 || currentOperand == "NaN") {
    currentOperand = number;
  } else {
    currentOperand = currentOperand + number;
  }
  updateDisplay();
}

//Choosing Operation then change value of operand
function chooseOperation(opt) {
  if (operation != "") {
    compute();
  }

  if (operation != "" && currentOperand == "") {
    operation = opt;
    updateDisplay();
    return;
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
  res = res.toString();
  memory = res;
  currentOperand = res;
  prevOperand = "";
  operation = "";

  updateDisplay();
}

function switchSign() {
  if (currentOperand == "0") return;
  currentOperand = currentOperand * -1;
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
  updateDisplay();
}

//Delete value/text from the end of string
function deleteText() {
  //Check if text value is 0 then don't delete
  if (currentOperandText.innerText == "0") return;

  if (operation != "" && currentOperand == "") {
    currentOperand = prevOperand;
    prevOperand = "";
    operation = "";
    updateDisplay();
  } else {
    //Delete from last character
    currentOperand = currentOperand.toString().slice(0, -1);
  }

  //If delete the last element, show 0
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
memoryRecall.addEventListener("click", () => {
  currentOperand = memory;
  updateDisplay();
});

switchSignBtn.addEventListener("click", switchSign);
clearBtn.addEventListener("click", clearText);
delBtn.addEventListener("click", deleteText);
