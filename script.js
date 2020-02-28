const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countdownDate1 = 'Jan 1, 2021';
let countdownTitle1 = 'New Years Day';
let countDown1 = new Date(countdownDate1).getTime();

let countdownDate2 = 'Jan 18, 2022';
let countdownTitle2 = 'My 35th Birthday';
let countDown2 = new Date(countdownDate2).getTime();

let countdownDate3 = 'Jan 18, 2037';
let countdownTitle3 = 'My 50th Birthday';
let countDown3 = new Date(countdownDate3).getTime();

const countdownForm = document.getElementById('countdownForm');
const countdown1El = document.getElementById('countdown1');
const countdown2El = document.getElementById('countdown2');
const countdown3El = document.getElementById('countdown3');

countdownForm.addEventListener('submit', updateCountdown);

function updateCountdown(e) {
  e.preventDefault();
  countdownDate = date.value;
  countDown = new Date(countdownDate).getTime();
  updateDOM();
}

function updateDOM(countDown, countdownTitle, countdownEl) {
  x = setInterval(() => {    

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
    </div>
    `

  }, second)
}

updateDOM(countDown1, countdownTitle1, countdown1El);
updateDOM(countDown2, countdownTitle2, countdown2El);
updateDOM(countDown3, countdownTitle3, countdown3El);