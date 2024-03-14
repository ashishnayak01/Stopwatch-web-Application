// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 0;
let timePaused = 0;
let timeStarted = 0;

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - timePaused;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        document.getElementById('startStop').textContent = 'Pause';
    } else {
        clearInterval(tInterval);
        timePaused = difference;
        running = false;
        document.getElementById('startStop').textContent = 'Resume';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    timePaused = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
    lapNumber = 0;
}

function lap() {
    if (!running) return;
    lapNumber++;
    let lapTime = document.getElementById('display').textContent;
    let node = document.createElement("LI");
    let textnode = document.createTextNode('Lap ' + lapNumber + ': ' + lapTime);
    node.appendChild(textnode);
    document.getElementById('laps').appendChild(node);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % (1000 * 60)) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    document.getElementById('display').textContent = hours + ':' + minutes + ':' + seconds;
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);