document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const operation = document.getElementById('operation');
    const buttons = document.querySelectorAll('.button');

    let currentOperation = '';
    let currentResult = '';
    let lastOperand = '';
    let lastOperator = '';
    let lastResult = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;

            if (value === 'C') {
                currentResult = '';
                currentOperation = '';
                lastOperand = '';
                lastOperator = '';
                lastResult = '';
                result.innerHTML = '';
                operation.innerHTML = '';
            } else if (value === 'DEL') {
                currentResult = currentResult.slice(0, -1);
                result.innerHTML = currentResult;
            } else if (value === '=') {
                if (currentOperation) {
                    currentOperation += currentResult;
                    try {
                        lastResult = eval(currentOperation).toString();
                        result.innerHTML = lastResult;
                        operation.innerHTML = currentOperation + ' =';
                        lastOperand = currentResult;
                        currentOperation = '';
                    } catch (e) {
                        result.innerHTML = 'Error';
                    }
                } else if (lastOperator && lastOperand) {
                    try {
                        lastResult = eval(lastResult + lastOperator + lastOperand).toString();
                        result.innerHTML = lastResult;
                        operation.innerHTML = lastResult + ' ' + lastOperator + ' ' + lastOperand + ' =';
                    } catch (e) {
                        result.innerHTML = 'Error';
                    }
                }
            } else if (['/', '*', '-', '+'].includes(value)) {
                if (currentResult) {
                    currentOperation += currentResult + ' ' + value + ' ';
                    operation.innerHTML = currentOperation;
                    lastOperator = value;
                    lastOperand = currentResult;
                    currentResult = '';
                    result.innerHTML = '';
                }
            } else {
                currentResult += value;
                result.innerHTML = currentResult;
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'Enter') {
            document.getElementById('equals').click();
        } else if (key === 'Backspace') {
            document.getElementById('delete').click();
        } else if (key === 'Escape') {
            document.getElementById('clear').click();
        } else if (['/', '*', '-', '+'].includes(key)) {
            document.getElementById(key === '/' ? 'divide' : key === '*' ? 'multiply' : key === '-' ? 'minus' : 'plus').click();
        } else if (key === '.') {
            document.getElementById('dot').click();
        } else if (!isNaN(key)) {
            document.getElementById(key).click();
        }
    });
});