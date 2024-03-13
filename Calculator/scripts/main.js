// Global constants and variables
const numberOfDigits = 10; 
const numberDisplay = document.getElementById("number_display");
const signDisplay = document.getElementById("sign_display");

var numberOne = [];
var numberTwo = [];
var numberInputArray = [];
var numberMarker = 1; // shows what number we are working with, One or Two
var operator = "";
// var memory = null;

displayNumber(0); 

// Add event listeners to digit buttons
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", onclickDigitEvent);
});

// Add event listeners to operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", onclickOperatorEvent);
});

// Add event listener to equal button
const equalButton = document.getElementById("equal_button");
equalButton.addEventListener("click", onclickEqualEvent);

// Add event listener to clear button
const clearButton = document.getElementById("clear_button");
clearButton.addEventListener("click", onclickClearEvent);

// Add event listener to change (+/-) button
const changeButton = document.getElementById("change_button");
changeButton.addEventListener("click", onclickChangeEvent);

// Add event listener to Backspace button
const backspaceButton = document.getElementById("backspace_button");
backspaceButton.addEventListener("click", onclickBackspaceEvent);

// Add keyboard event lictener
document.addEventListener("keyup", onKeyEvent);

// Transform array into number
function arrToNum (array) {
    let string = array.join("");
    if (string == ".") {
        string = "0.0";
    };
    return roundNumber(parseFloat(string));
    };

// Transorm number into array
function numToArr (number) {
    number = roundNumber(number);
    if (isNaN(number)) {
        return [];
    };
    return number.toString().split("");
};

// Calculating fuction, return Nan in case of error
function calculate (num1, num2, oper) {
    switch (oper) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 != 0) {
                return num1 / num2;
            };
            return NaN;
        case "*=":
            return Math.pow(num1, 2)
        default:
            return NaN;
    };
};

// Display number
function displayNumber (number) {
    number = roundNumber(number);
    let string = "";
    if (isNaN(number)) {
        string = "ERROR"
    } else {
        string = number.toString(); 
    };
    numberDisplay.textContent = string;
}; 

// Round number to max number of digits (or return ERROR)
function roundNumber (number) {
    let maxDisplayedNumber = "9"; // maximum number we can display
    let signMarker = 1; // is a number positive or negative
    let jMax = numberOfDigits - 2;
    if (number < 0) {
        signMarker = -1;
        number *= signMarker; // make a number positive
    };
    for (let j = 0; j < jMax; j++) {
        maxDisplayedNumber += "9";
    };
    maxDisplayedNumber = parseInt(maxDisplayedNumber);
    let array = number.toString().split("");
    let i = array.findIndex((element) => element == ".");
    let tens = Math.pow(10, jMax - i);

    number = number * tens;
    number = Math.round(number) / tens;
    if (number > maxDisplayedNumber) {
        return NaN;
    };
    return number * signMarker;
};

// Digit buttons event funcion
function onclickDigitEvent () {
    switch (numberMarker) {
        case 1:
            if (numberOne.length < numberOfDigits - 1) {
                if (numberOne[0] == "0") {
                    numberOne.shift();
                };
                numberOne.push(this.id);
            };
            displayNumber(arrToNum(numberOne));
            break;
        case 2:
            if (numberTwo.length < numberOfDigits - 1) {
                if (numberTwo[0] == "0") {
                    numberTwo.shift();
                };
                numberTwo.push(this.id)
            };
            displayNumber(arrToNum(numberTwo));
            break;
    };
    return;
};

// Operator buttons event function
function onclickOperatorEvent () {
    if (operator == "") {
        operator = this.id;
        numberMarker = 2;
        numberTwo = [];
        signDisplay.textContent = operator;
        return;
    };
    let num1 = arrToNum(numberOne);
    if (numberTwo.length == 0) {    // in case user click on opertor button
        operator = this.id;         // repeatedly, change operator without
        signDisplay.textContent = operator; // any calculation
        return;
    };
    let num2 = arrToNum(numberTwo);
    let result = calculate(num1, num2, operator);
    result = roundNumber(result);
    displayNumber(result);
    numberOne = numToArr(result);
    numberTwo = [];
    numberMarker = 2;
    operator = this.id;
    signDisplay.textContent = operator;
    return;
};

// Equal button event function
function onclickEqualEvent () {
    if (numberMarker == 1 || operator == "") {
        return;
    };
    let num1 = arrToNum(numberOne);
    if (numberTwo.length == 0) {
        numberTwo = [...numberOne];
    };
    let num2 = arrToNum(numberTwo);
    let result = calculate(num1, num2, operator);
    displayNumber(result);
    numberOne = numToArr(result);
    numberMarker = 2;
    operator = "";
    signDisplay.textContent = operator;
    numberTwo = [];
    return;
};

// Clear button event function
function onclickClearEvent() {
    numberOne = [];
    numberTwo = [];
    numberMarker = 1;
    operator = "";
    signDisplay.textContent = operator;
    displayNumber(0);
    return;
}

// +/- button event function
function onclickChangeEvent() {
    switch (numberMarker) {
        case 1:
            if (numberOne.length == 0) {
                return;
            };
            numberOne.unshift("-");
            displayNumber(arrToNum(numberOne));
            break;
        case 2:
            if (numberTwo.length == 0) {
                return;
            };
            numberTwo.unshift("-");
            displayNumber(arrToNum(numberTwo));
            break;
    };
    return;
}

// Backspace button event function
function onclickBackspaceEvent() {
    switch (numberMarker) {
        case 1:
            if (numberOne.length == 0) {
                return;
            };
            numberOne.pop();
            displayNumber(arrToNum(numberOne));
            break;
        case 2:
            if (numberTwo.length == 0) {
                return;
            };
            numberTwo.pop();
            displayNumber(arrToNum(numberTwo));
            break;
    };
    return;
}

// Keyboard keyup event function
function onKeyEvent(event) {
    let key = event.key;
    if (key == "Enter") {
        onclickEqualEvent();
        return;
    };
    if (key == "Backspace") {
        onclickBackspaceEvent();
        return;
    };
    if (key.toLowerCase() == "c") {
        onclickClearEvent();
        return;
    }
    if  (key.match(/[0-9]/)) {
        switch (numberMarker) {
            case 1:
                if (numberOne.length < numberOfDigits - 1) {
                    if (numberOne[0] == "0") {
                        numberOne.shift();
                    };
                    numberOne.push(key);
                };
                displayNumber(arrToNum(numberOne));
                break;
            case 2:
                if (numberTwo.length < numberOfDigits - 1) {
                    if (numberTwo[0] == "0") {
                        numberTwo.shift();
                    };
                    numberTwo.push(key)
                };
                displayNumber(arrToNum(numberTwo));
                break;
        };
        return;
    };
    if (key.match(/[\+\-\*\//]/)) {
        if (operator == "") {
            operator = key;
            numberMarker = 2;
            numberTwo = [];
            signDisplay.textContent = operator;
            return;
        };
        let num1 = arrToNum(numberOne);
        if (numberTwo.length == 0) {    // in case user click on opertor button
            operator = key;         // repeatedly, change operator without
            signDisplay.textContent = operator; // any calculation
            return;
        };
        let num2 = arrToNum(numberTwo);
        let result = calculate(num1, num2, operator);
        result = roundNumber(result);
        displayNumber(result);
        numberOne = numToArr(result);
        numberTwo = [];
        numberMarker = 2;
        operator = key;
        signDisplay.textContent = operator;
        return;
    };
    return;
};