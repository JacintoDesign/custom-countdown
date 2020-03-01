const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

const countdownForm = document.getElementById('countdownForm');
const countdownEl = document.getElementById('countdown');
const inputContainer = document.getElementById('input-container');
let countdownActive;

countdownForm.addEventListener('submit', updateCountdown);


function updateCountdown(e) {
  e.preventDefault();
  inputContainer.style.display = "none"; 
  countdownEl.style.display = "block";
  countdownTitle = title.value;
  countdownDate = date.value;
  if (countdownDate == '') {
    alert('Please select a date for the countdown.');
  } else {
    countDown = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateDOM() {
  countdownActive = setInterval(() => {    

    let now = new Date().getTime(),
        distance = countDown - now;

    let days = Math.floor(distance / (day));
    let hours = Math.floor((distance % (day)) / (hour));
    let minutes = Math.floor((distance % (hour)) / (minute));
    let seconds = Math.floor((distance % (minute)) / second);

    countdownEl.innerHTML = `
    <div class="countdown">
        <h1 id="countdown-title">${countdownTitle}</h1>
        <ul>
            <li><span>${days}</span>Days</li>
            <li><span>${hours}</span>Hours</li>
            <li><span>${minutes}</span>Minutes</li>
            <li><span>${seconds}</span>Seconds</li>
        </ul>
        <button onclick="resetDOM()">RESET</button>
    </div>
    `

  }, second)
}

function resetDOM() {
  countdownEl.style.display = "none";
  inputContainer.style.display = "block";
  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
}