// --- DOM ELEMENTS ---
const display = document.getElementById('display');
const calcApp = document.getElementById('calculator-app');
const toggleBtn = document.getElementById('sci-toggle');
const histBtn = document.getElementById('history-toggle');
const historyList = document.getElementById('history-list');
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// --- INPUT LOGIC ---
function appendToDisplay(input) {
    if (display.value === "Error") clearDisplay();
    display.value += input;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// --- MATH LOGIC ---
function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculate() {
    try {
        let rawExpression = display.value; // Save for history display
        if(rawExpression === "") return;

        let expression = rawExpression;

        // Scientific Replacements
        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/√/g, 'Math.sqrt'); 
        expression = expression.replace(/sin/g, 'Math.sin');
        expression = expression.replace(/cos/g, 'Math.cos');
        expression = expression.replace(/tan/g, 'Math.tan');
        expression = expression.replace(/log/g, 'Math.log10'); 
        expression = expression.replace(/ln/g, 'Math.log');   
        expression = expression.replace(/π/g, 'Math.PI');
        expression = expression.replace(/e/g, 'Math.E');

        // Handle Factorial
        expression = expression.replace(/(\d+)!/g, function(_match, number) {
            return `factorial(${number})`;
        });

        // Evaluate
        const result = eval(expression);

        if (!isFinite(result) || isNaN(result)) {
            display.value = "Error";
        } else {
            display.value = result;
            // Add to History
            addToHistory(rawExpression, result);
        }

    } catch (error) {
        console.error(error);
        display.value = "Error";
    }
}

// --- HISTORY LOGIC ---
function addToHistory(expr, res) {
    // Remove placeholder if it's the first item
    if (historyList.querySelector('div')) {
        historyList.innerHTML = '';
    }

    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
        <span class="hist-expr">${expr} =</span>
        <span class="hist-res">${res}</span>
    `;
    
    // Clicking item puts result back in display
    li.onclick = () => {
        display.value = res;
        toggleHistory(); // Close history view
    };
    
    // Add to top of list
    historyList.prepend(li);
}

function toggleHistory() {
    calcApp.classList.toggle('history-mode');
    histBtn.classList.toggle('active');
}

function clearHistory() {
    historyList.innerHTML = '<div style="text-align:center; padding: 20px; color: #64748b;">No history yet</div>';
}


// --- SCIENTIFIC MODE TOGGLE ---
function toggleScientificMode() {
    calcApp.classList.toggle('expanded');
    toggleBtn.classList.toggle('active');
}

// --- THEME SWITCHING ---
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.body.classList.remove('light-mode');
        toggleSwitch.checked = true;
    } else {
        document.body.classList.add('light-mode');
        toggleSwitch.checked = false;
    }
} else {
    document.body.classList.remove('light-mode');
    toggleSwitch.checked = true;
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// --- KEYBOARD SUPPORT ---
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Numbers & Basic Operators
    if (/[0-9\+\-\*\/\.\(\)\^]/.test(key)) {
        e.preventDefault();
        appendToDisplay(key);
    } 
    // Enter for Result
    else if (key === 'Enter') {
        e.preventDefault();
        calculate();
    } 
    // Backspace for Delete
    else if (key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } 
    // Escape or 'c' for Clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        e.preventDefault();
        clearDisplay();
    }
});
