const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
}
function clearDisplay() {
  display.value = "";
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

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

// 1. Check local storage for theme on page load
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  if (currentTheme === "dark") {
    document.body.classList.remove("light-mode");
    toggleSwitch.checked = true; // Switch toggle to "Dark" (right)
  } else {
    document.body.classList.add("light-mode");
    toggleSwitch.checked = false; // Switch toggle to "Light" (left)
  }
} else {
  // Default to Dark Mode if no preference is saved
  document.body.classList.remove("light-mode");
  toggleSwitch.checked = true;
}

// 2. Function to handle the switch change
function switchTheme(e) {
  if (e.target.checked) {
    // Checkbox checked -> Dark Mode
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  } else {
    // Checkbox unchecked -> Light Mode
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
}

// 3. Listen for changes on the checkbox
toggleSwitch.addEventListener("change", switchTheme);

// Load saved theme preference on page load
window.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const themeToggle = document.getElementById("theme-toggle");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️ Light Mode";
  }
});
document.getElementById("buttons").addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("num") || target.classList.contains("op")) {
    appendToDisplay(target.innerText);
  } else if (target.id === "clear") {
    clearDisplay();
  } else if (target.id === "delete") {
    deleteLast();
  } else if (target.id === "equals") {
    calculate();
  }

  // Add this Helper function for Factorial (e.g., 5!)
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
      let expression = display.value;

      // 1. Replace Power operator '^' with JS '**'
      // Example: 2^3 becomes 2**3
      expression = expression.replace(/\^/g, "**");

      // 2. Replace Square Root '√(' with 'Math.sqrt('
      expression = expression.replace(/√/g, "Math.sqrt");

      // 3. Handle Factorial '!'
      // We use Regex to find a number followed by ! (e.g., 5!)
      // and wrap it in our factorial function: factorial(5)
      expression = expression.replace(/(\d+)!/g, function (match, number) {
        return `factorial(${number})`;
      });

      // 4. Evaluate the final sanitized string
      const result = eval(expression);

      // Check if result is valid (not NaN or Infinity)
      if (!isFinite(result) || isNaN(result)) {
        display.value = "Error";
      } else {
        display.value = result;
      }
    } catch (error) {
      display.value = "Error";
      console.error(error);
    }
  }
});
