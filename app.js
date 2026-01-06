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

function toggleDarkMode() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme preference on page load
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeToggle = document.getElementById('theme-toggle');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }
});
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

