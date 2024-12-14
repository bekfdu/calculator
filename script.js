const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let shouldResetScreen = false;

function updateDisplay(number) {
    if (shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else {
        if (display.textContent === '0') {
            display.textContent = number;
        } else {
            display.textContent += number;
        }
    }
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '−':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            if (b === 0) return 'Bo‘linmaydi';
            return a / b;
        default:
            return null;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            inputNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            inputOperator(button.textContent);
        } else if (button.id === 'equals') {
            calculate();
        } else if (button.id === 'clear') {
            clearCalculator();
        } else if (button.id === 'plus-minus') {
            toggleSign();
        } else if (button.id === 'percent') {
            convertPercent();
        }
    });
});

function inputNumber(number) {
    if (display.textContent.includes('.') && number === '.') return;
    updateDisplay(number);
}

function inputOperator(selectedOperator) {
    if (operator !== '') calculate();
    firstOperand = display.textContent;
    operator = selectedOperator;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === '' || shouldResetScreen) return;
    secondOperand = display.textContent;
    const result = operate(operator, firstOperand, secondOperand);
    display.textContent = result;
    operator = '';
}

function clearCalculator() {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    shouldResetScreen = false;
}

function toggleSign() {
    display.textContent = (parseFloat(display.textContent) * -1).toString();
}

function convertPercent() {
    display.textContent = (parseFloat(display.textContent) / 100).toString();
}
