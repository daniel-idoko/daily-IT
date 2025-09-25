let questions = [];
const urlParams = new URLSearchParams(window.location.search);
let day = parseInt(urlParams.get('day')) || 0;
const questionsPerDay = 5;

const container = document.getElementById('questions-container');
const dayLabel = document.getElementById('day-label');
const nextDayBtn = document.getElementById('next-day');

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestionsForDay(day);
  });

function showQuestionsForDay(dayNumber) {
  const start = dayNumber * questionsPerDay;
  const end = start + questionsPerDay;
  const todaysQuestions = questions.slice(start, end);

  container.innerHTML = '';
  dayLabel.textContent = `Day ${dayNumber + 1}`;

  if (todaysQuestions.length === 0) {
    container.innerHTML = '<p>No more questions. You\'re done for now! 🎉</p>';
    nextDayBtn.style.display = 'none';
    return;
  }

  todaysQuestions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';

    const questionHTML = `
      <strong>Q${start + i + 1}:</strong> ${q.question} <br>
      <em>${q.category}</em>
      <button class="toggle-answer" style="margin-top: 0.5rem; background: #66bb6a; border: none; color: white; padding: 0.4rem 0.8rem; border-radius: 0.4rem; cursor: pointer;">
        Show Answer
      </button>
      <div class="answer">${q.answer}</div> <!-- q.answer is now HTML-safe -->
    `;

    div.innerHTML = questionHTML;
    container.appendChild(div);
  });

  document.querySelectorAll('.toggle-answer').forEach((btn) => {
    btn.addEventListener('click', () => {
      const answerDiv = btn.nextElementSibling;
      const isVisible = answerDiv.classList.contains('show');
      if (isVisible) {
        answerDiv.classList.remove('show');
        btn.textContent = 'Show Answer';
      } else {
        answerDiv.classList.add('show');
        btn.textContent = 'Hide Answer';
      }
    });
  });
}

nextDayBtn.addEventListener('click', () => {
  day++;
  showQuestionsForDay(day);
});
