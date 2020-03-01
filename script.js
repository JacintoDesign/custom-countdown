const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

const countdownForm = document.getElementById('countdownForm');
const countdownEl = document.getElementById('countdown');
const inputContainer = document.getElementById('input-container');

let savedCountdownObj = [];
let countdownActive;

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem('countdown') !== null) {
    savedCountdownObj = JSON.parse(localStorage.getItem('countdown'));
    inputContainer.style.display = 'none';
    countdownTitle = savedCountdownObj[0].title;
    countdownDate = savedCountdownObj[0].date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateCountdown(e) {
  e.preventDefault();
  // Hide input, reset countdown HTML
  inputContainer.style.display = 'none'; 
  countdownEl.innerHTML = '';
  // Set title and date, save to localStorage
  countdownTitle = title.value;
  countdownDate = date.value;
  let savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  }
  savedCountdownObj.unshift(savedCountdown);
  localStorage.setItem('countdown', JSON.stringify(savedCountdownObj));
  // Check if no date entered, alert
  if (countdownDate == '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateDOM() {
  countdownActive = setInterval(() => {    

    let now = new Date().getTime(),
        distance = countdownValue - now;

    let days = Math.floor(distance / (day));
    let hours = Math.floor((distance % (day)) / (hour));
    let minutes = Math.floor((distance % (hour)) / (minute));
    let seconds = Math.floor((distance % (minute)) / second);

    if (distance < 0) {
      clearInterval(countdownActive)
      countdownEl.innerHTML = `
      <h1 class="complete">Countdown Complete!</h1>
      <h1>${countdownTitle} finished on ${countdownDate}</h1>
      <button onclick="reset()" style="margin-top: 2.5rem">NEW COUNTDOWN</button>
      `
    } else {
      countdownEl.innerHTML = `
      <div class="countdown">
          <h1 id="countdown-title">${countdownTitle}</h1>
          <ul>
              <li><span>${days}</span>Days</li>
              <li><span>${hours}</span>Hours</li>
              <li><span>${minutes}</span>Minutes</li>
              <li><span>${seconds}</span>Seconds</li>
          </ul>
          <button onclick="reset()">RESET</button>
      </div>
      `
    }

  }, second)
  countdownEl.style.display = 'block';
}

function reset() {
  // Hide countdown, show input
  countdownEl.style.display = 'none';
  inputContainer.style.display = 'block';
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values, remove localStorage item
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

// On startup, check localStorage
restorePreviousCountdown();