const startButton = document.querySelector('.switch');
const timerDisplay = document.querySelector('.timer');
const pomodoroButton = document.querySelector('.btn-pomodoro');
const shortBreakButton = document.querySelector('.short-break');
const longBreakButton = document.querySelector('.long-break');
let timeInSeconds = 1500;
let timer;

function startTimer() {
    timer = setInterval(function() {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        timerDisplay.innerHTML = `${minutes}:${seconds}`;
        timeInSeconds--;
        if (timeInSeconds < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    timeInSeconds = 1500;
    timerDisplay.innerHTML = '25:00';
}

function applyColors(backgroundColor, pomodoroBackgroundColor, switchColor, pomodoroButtonColor, shortBreakButtonColor, longBreakButtonColor) {
    document.body.style.backgroundColor = backgroundColor;
    document.querySelector('.pomodoro').style.backgroundColor = pomodoroBackgroundColor;
    document.querySelector('.switch').style.color = switchColor;
    pomodoroButton.style.backgroundColor = pomodoroButtonColor;
    shortBreakButton.style.backgroundColor = shortBreakButtonColor;
    longBreakButton.style.backgroundColor = longBreakButtonColor;
}

function startShortBreak() {
    resetTimer();
    applyColors('#38858a', '#519396', '#38858a', 'transparent', '#467f82', 'transparent');
    timeInSeconds = 300;
    timerDisplay.innerHTML = '05:00';
}

function startLongBreak() {
    resetTimer();
    applyColors('#397097', '#5280a2', '#397097', 'transparent', 'transparent', '#466e8d');
    timeInSeconds = 900;
    timerDisplay.innerHTML = '15:00';
}

function startPomodoro() {
    resetTimer();
    applyColors('#ba4849', '#c25c5c', '#ba4849', '#a95250', 'transparent', 'transparent');
}

startButton.addEventListener('click', function() {
    if (startButton.innerHTML === 'START') {
        startButton.innerHTML = 'PAUSE';
        startTimer();
    } else {
        startButton.innerHTML = 'START';
        pauseTimer();
    }
});

shortBreakButton.addEventListener('click', function() {
    startButton.innerHTML = 'START';
    pauseTimer();
    startShortBreak();
});

pomodoroButton.addEventListener('click', function() {
    startButton.innerHTML = 'START';
    pauseTimer();
    startPomodoro();
});

longBreakButton.addEventListener('click', function() {
    startButton.innerHTML = 'START';
    pauseTimer();
    startLongBreak();
});