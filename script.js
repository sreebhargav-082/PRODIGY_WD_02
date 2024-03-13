let timerInterval;
let lapCount = 0;
let startTime;
let elapsedTime = 0;
let lapContainer;
let circleSizeIncrement = 30; // Increase in circle size for each lap up to lap 10

function startTimer() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  lapCount = 0;
  updateDisplay();
  resetCircleSize();
  lapContainer.innerHTML = '';
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

function updateDisplay() {
  const formattedTime = formatTime(elapsedTime);
  document.querySelector('.display').textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const millisecondsStr = (milliseconds % 1000).toString().padStart(3, '0').slice(0, 2);
  return `${hours}:${minutes}:${seconds}:${millisecondsStr}`;
}

function addLap() {
  lapCount++;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapContainer.appendChild(lapItem);
  if (lapCount <= 10) {
    increaseCircleSize();
  } else {
    lapContainer.classList.add('scroll');
  }
}

function increaseCircleSize() {
  const stopwatch = document.querySelector('.stopwatch');
  const currentSize = 300 + (lapCount - 1) * circleSizeIncrement;
  stopwatch.style.width = `${currentSize}px`;
  stopwatch.style.height = `${currentSize}px`;
}

function resetCircleSize() {
  const stopwatch = document.querySelector('.stopwatch');
  stopwatch.style.width = '300px'; // Reset to the original size
  stopwatch.style.height = '300px'; // Reset to the original size
}

window.onload = function() {
  lapContainer = document.querySelector('.laps');
  document.querySelector('.start').addEventListener('click', startTimer);
  document.querySelector('.pause').addEventListener('click', pauseTimer);
  document.querySelector('.reset').addEventListener('click', resetTimer);
  document.querySelector('.lap').addEventListener('click', addLap);
};
