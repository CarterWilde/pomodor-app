import { app, BrowserWindow, ipcMain } from "electron";
import { IView } from "../Scripts/IView";
import { ApplicationController } from "../ApplicationController";
import { View } from "../Scripts/View";

export class Settings extends View implements IView {
    constructor(Controller: ApplicationController) { 
        super(Controller);
        ipcMain.on("done-button-clicked", () => {
            this.closeView();
        })
    }

    startView(): void {
        this.Window = new BrowserWindow({
            width: 200,
            height: 100,
            frame: false,
            icon: './resources/PomodoroApp.png',
            resizable: false,
            webPreferences: {
            nodeIntegration: true
            }
        });
        this.Window.loadFile('./Views/settings.html');
    }

    closeView(): void {
        this.Window.close();
        this.Controller.Windows.delete("settings")
    }
}