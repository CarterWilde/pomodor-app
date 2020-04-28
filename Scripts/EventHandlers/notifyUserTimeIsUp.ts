window.addEventListener('timer-done', (e) => {
    var audio = new Audio('../Resources/ring.mp3');
    audio.play();
    ipcRenderer.send("timer-done");
    let myNotification = new Notification("Time's Up!", {
        body: "You've completed a time of " 
        + localStorage.getItem("minutesStart") + ":" 
        + formatSeconds(Number.parseInt(localStorage.getItem("secondsStart"))) + "!",
        silent: true
    })
});