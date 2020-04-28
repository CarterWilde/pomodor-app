function getTime() {
    return getMinutes() + ":" + getSeconds();
}

function getMinutes(): number {
    let inputMinute = document.getElementById("minutes") as HTMLInputElement;
    return parseInt(inputMinute.value);
}

function getSeconds(): number {
    let inputSeconds = document.getElementById("seconds") as HTMLInputElement;
    return parseInt(inputSeconds.value);
}

function formatSeconds(seconds: number): string {
    return ("0" + seconds).slice(-2);
}

function updateView(minutes: number, seconds: number): void {
    let minutesDisplay = document.getElementById("timerMinutes");
    let secondsDisplay = document.getElementById("timerSeconds");
    let formattedSeconds = formatSeconds(seconds);
    minutesDisplay.innerHTML = minutes.toString();
    secondsDisplay.innerHTML = formattedSeconds;
}

function getCurrentTime() {
    return getCurrentSeconds() + ":" + getCurrentSeconds();
}

function getCurrentSeconds(): number {
    let timerSeconds = document.getElementById("timerSeconds").innerText;
    return parseInt(timerSeconds);
}


function getCurrentMinutes(): number {
    let timerMinutes = document.getElementById("timerMinutes").innerText;
    return parseInt(timerMinutes);
}

function setTwoNumberDecimal(): void {
    let input = document.getElementById("seconds") as HTMLInputElement;
    let seconds = parseInt(input.value);
    if(seconds < 60){
        let formattedNumber = ("0" + seconds).slice(-2);
        input.value = formattedNumber;
    } else {
        let inputMinute = document.getElementById("minutes") as HTMLInputElement;
        let minutes = parseInt(inputMinute.value);
        minutes++;
        inputMinute.value = minutes.toString();
        input.value = "00";
    }
}
