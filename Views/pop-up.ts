import { app, BrowserWindow, ipcMain } from "electron";
import { IView } from "../Scripts/IView";
import { ApplicationController } from "../ApplicationController";
import { View } from "../Scripts/View";
const electron = require('electron');

export class Popup extends View implements IView {
    Minutes: number;
    Seconds: number;
    constructor(Controller: ApplicationController, Minutes: number, Seconds: number) { 
        super(Controller);
        this.Minutes = Minutes;
        this.Seconds = Seconds;
    }

    startView(): void {
        this.Window = new BrowserWindow({
            width: 200,
            height: 120,
            alwaysOnTop: true,
            frame: false,
            transparent: true,
            icon: './resources/PomodoroApp.png',
            resizable: false,
            webPreferences: {
            nodeIntegration: true
            }
        });
        this.Controller.Windows.get("index").closeView();
        let dipslay = electron.screen.getPrimaryDisplay();
        let bounds = this.Window.getBounds();
        this.Window.setPosition(dipslay.size.width - bounds.width
                               ,dipslay.size.height - bounds.height);
        this.Window.loadFile('./Views/pop-up.html');
        ipcMain.on("on-pop-up-window-loaded", () => {
            let data = { 
                Minutes: this.Minutes,
                Seconds: this.Seconds
            };
            this.Window.webContents.send('timer-data', data);
        });
    }

    closeView(): void {
        this.Controller.Windows.delete("popup");
        this.Window.close();
    }
}