let ipcRenderer = require("electron").ipcRenderer;

function closeButtonClicked(data: any) {
    ipcRenderer.send("close-button-clicked", data);
}

function settingsButtonClicked(data: any) {
    ipcRenderer.send("settings-button-clicked", data);
}

function doneButtonClicked(data: any) {
    ipcRenderer.send("done-button-clicked", data);
}

function popUpButtonClicked() {
    let data = {
        Minutes: getCurrentMinutes(),
        Seconds: getCurrentSeconds()
    }
    ipcRenderer.send("on-pop-up-button-clicked", data);
}


ipcRenderer.once("timer-data", (event, data: any) => {
    let minutes = data.Minutes;
    let seconds = data.Seconds;
    updateView(minutes, seconds);
    let x = setInterval(() => {
        if(seconds <= 0 && minutes <= 0){
            clearInterval(x);
            let timerFinishedEvent = new Event('timer-done');
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
});

function popUpWindowLoaded(data: any) {
    ipcRenderer.send("on-pop-up-window-loaded", data);
}