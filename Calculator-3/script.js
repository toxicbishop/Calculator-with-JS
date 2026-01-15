const screen = document.querySelector('#screen');

function addText(text) {
    if (screen.value === '0') screen.value = '';
    
    let processedText = text;
    if (text === '×') processedText = '*';
    if (text === '÷') processedText = '/';
    
    screen.value += processedText;
}

function clearAll() {
    screen.value = '';
}

function backspc() {
    screen.value = screen.value.substring(0, screen.value.length - 1);
}

function calculate() {
    try {
        // Simple eval for demonstration, but safer approaches exist
        screen.value = eval(screen.value);
    } catch (e) {
        screen.value = "Error";
        setTimeout(() => screen.value = '', 1500);
    }
}

function sin() {
    screen.value = Math.sin(eval(screen.value));
}

function cos() {
    screen.value = Math.cos(eval(screen.value));
}

function tan() {
    screen.value = Math.tan(eval(screen.value));
}

function log() {
    screen.value = Math.log10(eval(screen.value));
}

function pi() {
    screen.value += Math.PI.toFixed(8);
}

function e() {
    screen.value += Math.E.toFixed(8);
}

function sqrt() {
    screen.value = Math.sqrt(eval(screen.value));
}

function pow() {
    screen.value = Math.pow(eval(screen.value), 2);
}

function fact() {
    let num = parseInt(eval(screen.value));
    if (num < 0) return screen.value = "Error";
    let f = 1;
    for (let i = 1; i <= num; i++) {
        f = f * i;
    }
    screen.value = f;
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') addText(e.key);
    if (e.key === '+') addText('+');
    if (e.key === '-') addText('-');
    if (e.key === '*') addText('×');
    if (e.key === '/') addText('÷');
    if (e.key === '.') addText('.');
    if (e.key === '(') addText('(');
    if (e.key === ')') addText(')');
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') backspc();
    if (e.key === 'Escape') clearAll();
});
