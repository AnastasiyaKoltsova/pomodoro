import colors from "/src/scripts/colors.js";

const startButton = document.querySelector('.switch');
const timerDisplay = document.querySelector('.timer');
const pomodoroButton = document.querySelector('.btn-pomodoro');
const shortBreakButton = document.querySelector('.short-break');
const longBreakButton = document.querySelector('.long-break');
const resetButton = document.querySelector('.reset-btn');
const addTaskBtn = document.querySelector('.tasks-add__btn');

const pomodoroTime = 1500;
const shortBreakTime = 300;
const longBreakTime = 900;

let timeInSeconds = 1500;
let timer;
let currentPomodoroCount = 0;
let maxPomodoroCount = 3;
let statusOfTimer = 'pomodoro';

function getReadableTime(time) {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return minutes + ':' + seconds;
}

function startTimer() {
    timer = setInterval(function() {
        timerDisplay.innerHTML = getReadableTime(timeInSeconds);
        timeInSeconds--;
        if (timeInSeconds <= 0) {
            clearInterval(timer);
            startButton.innerHTML = 'START';
            if (statusOfTimer === 'pomodoro') {
                currentPomodoroCount ++;
                if (currentPomodoroCount === maxPomodoroCount) {
                    startLongBreak();
                    statusOfTimer = 'long';
                } else {
                    startShortBreak();
                    statusOfTimer = 'short';
                }
            } else {
                startPomodoro();
                statusOfTimer = 'pomodoro';
            }
        }
    }, 10);
}

function updateTimerDisplay(time) {
    timerDisplay.innerHTML = getReadableTime(time);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer(time, status) {
    timeInSeconds = time;
    updateTimerDisplay(time);
    startButton.innerHTML = 'START';
    pauseTimer();
    applyColors(
        colors[status].backgroundColor,
        colors[status].pomodoroBackgroundColor,
        colors[status].switchColor,
        colors[status].pomodoroButtonColor,
        colors[status].shortBreakButtonColor,
        colors[status].longBreakButtonColor,
        colors[status].addTaskBtnBackground,
        colors[status].addTaskBtnBorder,
        colors[status].addTaskBtnText,
        colors[status].addTaskLine,
        colors[status].addTaskBtnSetting,
    );
}

function startTimerWithColor(time, status) {
    resetTimer(time, status);
    timeInSeconds = time;
    updateTimerDisplay(time);
    statusOfTimer = status;
}

function applyColors(backgroundColor, pomodoroBackgroundColor, switchColor, pomodoroButtonColor, shortBreakButtonColor, longBreakButtonColor, addTaskBtnBackground, addTaskBtnBorder, addTaskBtnText, addTaskLine, addTaskBtnSetting) {
    document.body.style.backgroundColor = backgroundColor;
    document.querySelector('.pomodoro').style.backgroundColor = pomodoroBackgroundColor;
    document.querySelector('.switch').style.color = switchColor;
    pomodoroButton.style.backgroundColor = pomodoroButtonColor;
    shortBreakButton.style.backgroundColor = shortBreakButtonColor;
    longBreakButton.style.backgroundColor = longBreakButtonColor;
    addTaskBtn.style.backgroundColor = addTaskBtnBackground;
    addTaskBtn.style.borderColor = addTaskBtnBorder;
    addTaskBtn.style.color = addTaskBtnText;
    document.querySelector('.tasks-title').style.borderColor = addTaskLine;
    document.querySelector('.tasks-btn').style.backgroundColor = addTaskBtnSetting;
}

function startShortBreak() {
    startTimerWithColor(shortBreakTime, 'short');
}

function startLongBreak() {
    startTimerWithColor(longBreakTime, 'long');
}

function startPomodoro() {
    startTimerWithColor(pomodoroTime, 'pomodoro');
}

function toggleStartPauseButton() {
    if (startButton.innerHTML === 'START') {
        startButton.innerHTML = 'PAUSE';
        startTimer();
    } else {
        startButton.innerHTML = 'START';
        pauseTimer();
    }
}

startButton.addEventListener('click', toggleStartPauseButton);

shortBreakButton.addEventListener('click', function() {
    startButton.innerHTML = 'START';
    pauseTimer();
    startTimerWithColor(shortBreakTime, 'short');
});

pomodoroButton.addEventListener('click', function() {
    startButton.innerHTML = 'START';
    pauseTimer();
    startTimerWithColor(pomodoroTime, 'pomodoro');
});

longBreakButton.addEventListener('click', function() {
    startButton.innerHTML = 'START';
    pauseTimer();
    startTimerWithColor(longBreakTime, 'long');
});

resetButton.addEventListener('click', function() {
    startButton.innerHTML = 'START';
    pauseTimer();
    if (statusOfTimer === 'pomodoro') {
        resetTimer(pomodoroTime, 'pomodoro');
    } else if (statusOfTimer === 'short') {
        resetTimer(shortBreakTime, 'short');
    } else if (statusOfTimer === 'long') {
        resetTimer(longBreakTime, 'long');
    }
});

window.addEventListener("DOMContentLoaded", () => {
    timerDisplay.innerHTML = getReadableTime(pomodoroTime);
});