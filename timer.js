const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let intervalId = null;
let remainingTime = 0;

startBtn.addEventListener("click", () => {
  // Convert user input to seconds
  remainingTime =
    hoursInput.value * 3600 + minutesInput.value * 60 + secondsInput.value * 1;

  // Check if time is valid
  if (remainingTime <= 0) {
    alert("Please enter a valid time");
    return;
  }

  // Disable input fields and start button
  hoursInput.disabled = true;
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  startBtn.disabled = true;

  // Start the timer
  intervalId = setInterval(() => {
    remainingTime--;
    updateTimeDisplay();

    // Check if timer has reached zero
    if (remainingTime === 0) {
      document.getElementById("audio").play();
      clearInterval(intervalId);
      playSound();
      alert("Time's up!");
      reset();
    }
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  reset();
});

function updateTimeDisplay() {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  hoursInput.value = padNumber(hours);
  minutesInput.value = padNumber(minutes);
  secondsInput.value = padNumber(seconds);
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function reset() {
  remainingTime = 0;
  updateTimeDisplay();
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  startBtn.disabled = false;
}

function playSound() {
  const audio = new Audio("sound.mp3");
  audio.play();
}