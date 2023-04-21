class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement;
        this.currOperandTextElement = currOperandTextElement;
        this.clear();
    }

    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currOperand === '') return
        if(this.prevOperand !== '') {
            this.operate();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    operate() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+': 
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default: 
                return;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number) {
        const stringNum = number.toString();
        const intNum = parseFloat(stringNum.split('.')[0]);
        const decimalNum = stringNum.split('.')[1];
        let intDisplay;
        if ( isNaN(intNum)) {
            intDisplay = '';
        } else {
            intDisplay = intNum.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalNum != null) {
            return `${intDisplay}.${decimalNum}`;
        } else {
            return intDisplay;
        }
    }

    updateDisplay() {
        this.currOperandTextElement.innerText = 
            this.getDisplayNumber(this.currOperand);
        console.log(this.operation);
        if(this.operation != null){
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOperandTextElement.innerText = '';
        }
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-previous]');
const currOperandTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.operate();
    calculator.updateDisplay();
})

allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})