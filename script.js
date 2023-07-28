// Get the counter element
const counterElement = document.getElementById('count');

// Get the add and subtract buttons
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');

// Function to update the counter on the page and store it in localStorage
function updateCounter(value) {
  counter = value;
  counterElement.textContent = counter;
  localStorage.setItem('counterValue', counter);
}

// Check if the counter value exists in localStorage, otherwise set it to 0
let counter = parseInt(localStorage.getItem('counterValue')) || 0;
updateCounter(counter);

// Event listeners for buttons
addBtn.addEventListener('click', () => {
  counter += 1;
  updateCounter(counter);
});

subtractBtn.addEventListener('click', () => {
  counter -= 1;
  updateCounter(counter);
});
