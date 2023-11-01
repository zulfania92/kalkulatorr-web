const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0' || calculator.waitingForSecondNumber) {
        calculator.displayNumber = digit;
        calculator.waitingForSecondNumber = false;
    } else {
        calculator.displayNumber += digit;
    }
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('double')) {
            performCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = (parseFloat(calculator.displayNumber) * -1).toString();
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}

function performCalculator() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = '0';
    const first = parseFloat(calculator.firstNumber);
    const second = parseFloat(calculator.displayNumber);

    if (calculator.operator === "+") {
        result = first + second;
    } else if (calculator.operator === "-") {
        result = first - second;
    } else if (calculator.operator === "*") {
        result = first * second;
    } else if (calculator.operator === "/") {
        if (second === 0) {
            alert("Angka 0 tidak diperbolehkan");
            clearCalculator();
            updateDisplay();
            return;
        }
        result = first / second;
    }

    calculator.displayNumber = result.toString();
}