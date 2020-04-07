class Calculator {
  constructor(prevOperandTextElement, currentOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    //only allow decimal mark once
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    //operation won't work if currentOperand is empty
    if (this.currentOperand === "") return;
    //auto calculate if the preOperand has input already
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    //parse the input string to float number
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "＋":
        computation = prev + current;
        break;
      case "－":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  //add comma to format the number string
  getDisplayNumber(number) {
    return number;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevOperandTextElement.innerText = "";
    }
  }
}

//DOM selection
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const prevOperandTextElement = document.querySelector("[data-prev-operand]");
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  prevOperandTextElement,
  currentOperandTextElement
);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn.innerText);
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

//toggle switch dark mode
const toggleAll = document.querySelector(".toggle");
const toggleOff = document.getElementById("toggle-off");
const toggleOn = document.getElementById("toggle-on");
const buttons = document.querySelectorAll("button");
const calGrid = document.querySelector(".calculator-grid");

toggleAll.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleOff.classList.toggle("on");
  toggleOn.classList.toggle("off");
  calGrid.classList.toggle("dark");
  buttons.forEach((btn) => {
    btn.classList.toggle("dark");
  });
});
