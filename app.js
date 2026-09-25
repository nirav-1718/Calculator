// use below functions
// clearDisplay() done
// deleteLast() done
// appendValue() done
// calculate() done

const display = document.getElementById("display");

const operators = ["%", "/", "*", "-", "+"];


function appendValue(value) {
    const currentValue = display.value;
    const lastChar = display.value.slice(-1);

    if ((currentValue === '0' || currentValue === 'Error') && !operators.includes(value) && value !== '.') {
        display.value = value;
        return;
    }

    if (operators.includes(lastChar) && operators.includes(value)) {
    display.value = currentValue.slice(0,-1) + value;
    return;
    }

    if (value === '.') {
        const parts = currentValue.split(/[\+\-\*\/\%]/);
        const lastNumber = parts[parts.length-1];
        if (lastNumber.includes('.')) {
            return;
        }
    }

    display.value += value;
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast(){
    if (display.value.length === 1 || display.value === 'Error') {
        display.value = '0';
    } else {
        display.value = display.value.slice(-1);
    }
}

function calculate() {
    try {
        let expression = display.value;
        if (!expression || operators.includes(expression.slice(-1))) {
            return;
        }

        expression = expression.replace(/\.$/, '');

        let result = eval(expression);

        if (!isFinite(result) || isNaN(result)) {
            display.value = 'Error';
        } else {
            result = Math.round(result * 1e10) / 1e10;
            display.value = result;
        }
    } catch (e) {
        display.value = 'Error';
    }
}