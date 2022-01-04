const secondsInaMinute = 60;
let input_focus_time = window.prompt("Enter FOCUS time in minutes");
let input_break_time = window.prompt("Enter BREAK time in minutes");
const break_time = secondsInaMinute * input_break_time;
const focus_time = secondsInaMinute * input_focus_time;
const seconds_10 = 10; //for testing

let interval;
let isPaused = true;
let countdownWasStarted = false;
let pomodoroDuration = focus_time; //by default
let timeLeftInSeconds = 0;

window.onload = function () {
  //when the document is finished loading, replace everything
  //between the <a ...> </a> tags with the value of splitText
  document.getElementById("start-timer-display").innerHTML = input_focus_time;
};

// Button Handlers
function updateDuration() {
  //The pomodoro duration is by default 50, but we can change to 15!
  if (pomodoroDuration == focus_time) {
    pomodoroDuration = break_time;
  } else {
    pomodoroDuration = focus_time;
  }

  timeLeftInSeconds = pomodoroDuration;
  updateTimeString();
}

function playPauseCountdown() {
  isPaused = !isPaused;

  updatePlayPauseButton();

  if (!countdownWasStarted) {
    //This function could be called after initiating the timer,
    //so we need to differentiate when its start vs pause vs resume
    resetCountdown();
    updateTimeString();
  }

  countdownWasStarted = true;

  if (isPaused) {
    stopCountdown();
  } else {
    // Update the count down every 1 second
    interval = setInterval(updateCountdown, 1000);
  }
}

function restartCountdown() {
  //When we reset the countdown, stop the interval and reset things back to normal
  stopCountdown();
  resetCountdown();

  isPaused = true;
  updatePlayPauseButton();
  updateTimeString();
}

// Biz Logic
function updateCountdown() {
  if (isPaused) {
    return;
  }

  timeLeftInSeconds--;

  updateTimeString();

  if (timeLeftInSeconds == 0) {
    playYoScott();
    stopCountdown();
    isPaused = true;
    updatePlayPauseButton();
  }
}

function pauseCountdown() {
  isPaused = !isPaused;
}

function stopCountdown() {
  clearInterval(interval);
}

function resetCountdown() {
  isPaused = false;
  timeLeftInSeconds = pomodoroDuration;
}

// View Updates
function updatePlayPauseButton() {
  let playPauseImageSrc;
  if (isPaused) {
    playPauseImageSrc = "playButton4x.png";
  } else {
    playPauseImageSrc = "pauseButton4x.png";
  }
  document.getElementById("playPause").src = playPauseImageSrc;
}

function updateTimeString() {
  let minutes = Math.floor(timeLeftInSeconds / secondsInaMinute);
  let seconds = timeLeftInSeconds % secondsInaMinute;

  if (seconds < 10) {
    secondsString = "0" + seconds;
  } else {
    secondsString = seconds;
  }

  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML =
    minutes + ":" + secondsString;
}

function playYoScott() {
  var yoScottAudio = document.getElementById("yoScottAudio");
  yoScottAudio.play();

  document.getElementById("countdown").innerHTML = "YOO";
}
