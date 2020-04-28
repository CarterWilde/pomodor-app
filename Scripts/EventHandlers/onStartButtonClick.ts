var timerFinishedEvent = new Event('timer-done');
var x: NodeJS.Timeout;
var minutes: number;
var seconds: number;

function onStartButtonClicked() {
    var button = document.getElementById("StartButton") as HTMLButtonElement;
    button.disabled = true;
    minutes = getMinutes();
    seconds = getSeconds();
    localStorage.setItem("minutesStart", minutes.toString());
    localStorage.setItem("secondsStart", seconds.toString());
    updateView(minutes, seconds);
    x = setInterval(() => {
        if(seconds <= 0 && minutes <= 0){
            clearInterval(x);
            button.disabled = false;
            window.dispatchEvent(timerFinishedEvent);
        } else {
            if(seconds <= 0){
                if(minutes > 0){
                    minutes--;
                    seconds = 60;
                }
            }
            seconds--;
        }
        updateView(minutes, seconds);
    }, 1000);
}