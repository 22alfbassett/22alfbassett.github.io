const buttonsNL = document.querySelectorAll('button');
const buttons = buttonsNL
let runningTotal = 0;
let secondNum = ''; // (runningTotal) (oepration) (secondNum)
let nextOperation = 'add'; //Start by adding first input to running total
const ans = document.getElementById('answer');
console.log(buttons);
let calculationDone = false;
let fullCalcDone = false;

function handle(elementid) {
    if (elementid === 'modulus'
        || elementid === 'divide'
        || elementid === 'subtract'
        || elementid === 'multiply'
        || elementid === 'add') {
        if (elementid === 'subtract' && secondNum === '') { //Initial negative
            secondNum += '-'
            ans.innerHTML = secondNum;
            calculationDone = false;
        }
        else if (secondNum === '' || secondNum === '-') {
            ans.innerHTML = "ERROR";
        }
        else {
            fullCalcDone = false;
            if (!calculationDone){ //Make sure we don't have another operation completed
                imCalc();
            }
            ans.innerHTML = runningTotal;
            secondNum = ''; //Reset input
            nextOperation = elementid;
            calculationDone = true;
        }
    }
    else if (elementid === 'equals') {
        imCalc();
        calculationDone = true;
        ans.innerHTML = runningTotal;
        fullCalcDone = true;
    }
    else if (elementid === 'CAC') {
        runningTotal = 0;
        secondNum = '';
        nextOperation = 'add';
        ans.innerHTML = runningTotal;
    }
    else if (elementid === 'sqrt') {
        if (calculationDone && !fullCalcDone) {
            runningTotal = 0;
            ans.innerHTML = "ERROR";
        }
        else {
            imCalc();
            runningTotal = Math.sqrt(runningTotal);
            ans.innerHTML = runningTotal;
        }
    }
    else {
        if (!calculationDone) {
            secondNum += elementid;
            ans.innerHTML = secondNum;
        }
        if (calculationDone) {
            calculationDone = false;
            if (fullCalcDone) {
                runningTotal = 0;
                fullCalcDone = false;
                nextOperation = 'add';
            }
            secondNum = '';
            secondNum += elementid;
            ans.innerHTML = secondNum;
        }
    }
}

//Add touch button support
buttonsNL.forEach(element => {
        element.addEventListener('click', () => {handle(element.id)})});

//Keystroke support
document.onkeydown = (e) => {
    const key = e.key;
    console.log(key);
    if (key === '=') handle('equals');
    else if (key === '+') handle('add');
    else if (key === '-') handle('subtract');
    else if (key === '/') handle('divide');
    else if (key === '%') handle('modulus');
    else if (key === '*') handle('multiply');
    else if (key === 'C' || key === 'Escape') handle('CAC');
    else if (key === 's' || key === 'r') handle('sqrt');
    else if (key === '.') handle('.');
    else {
        const num = Number(key);
        console.log(num);
        if (!isNaN(num)) handle(num);
    }
}

function imCalc() {
    if (nextOperation === 'add') {
        runningTotal = runningTotal + Number(secondNum);
    } else if (nextOperation === 'subtract') {
        runningTotal = runningTotal - secondNum;
    } else if (nextOperation === 'divide') {
        if (Number(secondNum) === 0) {
            runningTotal = NaN;
        }
        runningTotal = runningTotal / secondNum;
    } else if (nextOperation === 'multiply') {
        runningTotal = runningTotal * secondNum;
    } else if (nextOperation === 'modulus') {
        runningTotal = runningTotal % secondNum;
    }
}