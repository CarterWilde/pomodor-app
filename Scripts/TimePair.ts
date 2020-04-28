export class TimePair{
    Minutes: number;
    Seconds: number;

    constructor(Minutes: number, Seconds: number) {
        this.Seconds = Minutes;
        this.Seconds = Seconds;
    }

    formatTime(){
        return ("0" + this.Seconds).slice(-2);
    }
}