const questionsPerDay = 5;
const daysList = document.getElementById('days-list');

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    const totalDays = Math.ceil(data.length / questionsPerDay);
    for (let i = 0; i < totalDays; i++) {
      const btn = document.createElement('a');
      btn.className = 'day-button';
      btn.textContent = `Day ${i + 1}`;
      btn.href = `index.html?day=${i}`;
      daysList.appendChild(btn);
    }
  });
