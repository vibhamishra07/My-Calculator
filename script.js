
class MyCalculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allclear()
    }
    // function for clear button
    allclear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // function for delete button
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // function for appending digits to current operand
    append(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // function for choice operation
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // function for computing the values
    computation() {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case 'x':
                result = prev * current
                break
            case '/':
                result = prev / current
                break
            case '%':
                result = prev % current
                break
            default:
                return
        }
        if (result.toString().length >= 10) {
            this.currentOperand = result.toPrecision(8);
        }
        else {
            this.currentOperand = result
        }
        this.operation = undefined
        this.previousOperand = ''
    }

    // for display numbers in commas and for floating  numbers
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    // updating display
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[operand-numbers]')
const operationButtons = document.querySelectorAll('[operators]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const previousOperandTextElement = document.querySelector('[previous-operand]')
const currentOperandTextElement = document.querySelector('[current-operand]')

const mycalculator = new MyCalculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        mycalculator.append(button.innerText);
        mycalculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        mycalculator.chooseOperation(button.innerText)
        mycalculator.updateDisplay()
    })
})

// when user clicks on equal button for computation
equalsButton.addEventListener('click', button => {
    mycalculator.computation()
    mycalculator.updateDisplay()
})

// when user clicks on AC button
allClearButton.addEventListener('click', button => {
    mycalculator.allclear()
    mycalculator.updateDisplay()
})

// when user clicks on delete button
deleteButton.addEventListener('click', button => {
    mycalculator.delete()
    mycalculator.updateDisplay()
})