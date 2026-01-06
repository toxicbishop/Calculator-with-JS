const display = document.getElementById('display');

function appendToDisplay(input) {
    display.value += input;
}
function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}
document.getElementById('buttons').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('num') || target.classList.contains('op')) {
        appendToDisplay(target.innerText);
    } else if (target.id === 'clear') {
        clearDisplay();
    } else if (target.id === 'delete') {
        deleteLast();
    } else if (target.id === 'equals') {
        calculate();
    }
});

