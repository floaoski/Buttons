// script.js
const counterElement = document.getElementById('count');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const highestAddingUsersElement = document.getElementById('highestAddingUsers');
const highestSubtractingUsersElement = document.getElementById('highestSubtractingUsers');

let counter = 0;

function updateCounter(value) {
  counter = value;
  counterElement.textContent = counter;
}

function updateLeaderboards() {
  fetch('/api/leaderboards')
    .then(response => response.json())
    .then(data => {
      highestAddingUsersElement.innerHTML = data.highestAddingUsers.map(user => `<li>${user.username}: ${user.totalAdditions}</li>`).join('');
      highestSubtractingUsersElement.innerHTML = data.highestSubtractingUsers.map(user => `<li>${user.username}: ${user.totalSubtractions}</li>`).join('');
    })
    .catch(error => console.error('Error fetching leaderboards:', error));
}

addBtn.addEventListener('click', () => {
  fetch('/api/add', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      updateCounter(data.counterValue);
      updateLeaderboards();
    })
    .catch(error => console.error('Error adding 1:', error));
});

subtractBtn.addEventListener('click', () => {
  fetch('/api/subtract', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      updateCounter(data.counterValue);
      updateLeaderboards();
    })
    .catch(error => console.error('Error subtracting 1:', error));
});

// Initial counter update and leaderboard fetch
updateCounter(counter);
updateLeaderboards();
