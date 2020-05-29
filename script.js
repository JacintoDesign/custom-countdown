const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let savedCountdownArray = [];
let countdownActive;

// Set Date Input Min & Value with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('value', today);
dateEl.setAttribute('min', today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // If the countdown has ended, show final state
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      completeEl.hidden = true;
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      countdownEl.hidden = false;
    }
  }, second);
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem('countdown')) {
    savedCountdownArray = JSON.parse(localStorage.getItem('countdown'));
    inputContainer.hidden = true;
    countdownTitle = savedCountdownArray[0].title;
    countdownDate = savedCountdownArray[0].date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateCountdown(e) {
  e.preventDefault();
  // Hide input, reset countdown HTML
  inputContainer.hidden = true;
  // Set title and date, save to localStorage
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  const savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  savedCountdownArray.unshift(savedCountdown);
  localStorage.setItem('countdown', JSON.stringify(savedCountdownArray));
  // Check if no date entered, alert
  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function reset() {
  // Hide countdowns, show input form
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values, remove localStorage item
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();
