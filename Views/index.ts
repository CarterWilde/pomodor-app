import { BrowserWindow, ipcMain, app } from "electron";
import { IView } from "../Scripts/IView";
import { ApplicationController } from "../ApplicationController";
import { Settings } from "../Views/settings";
import { View } from "../Scripts/View";
import { Popup } from "./pop-up";

export class Index extends View implements IView {
    constructor(Controller: ApplicationController) {
        super(Controller);
        ipcMain.on("close-button-clicked", () => {
            this.Controller.Windows.get("index").closeView();
        });
        ipcMain.on("settings-button-clicked", () => {
            this.Controller.Windows.set("settings", new Settings(this.Controller));
            this.Controller.Windows.get("settings").startView();
        });
        ipcMain.on("on-pop-up-button-clicked", (event: any, data: any) => {
            this.Controller.Windows.set("popup", new Popup(this.Controller
                                                         , data.Minutes
                                                         , data.Seconds));
            this.Controller.Windows.get("popup").startView();
        });
    }
    
    startView(): void {
        this.Window = new BrowserWindow({
            width: 315,
            height: 560,
            frame: false,
            icon: './resources/PomodoroApp.png',
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        this.Window.loadFile('./Views/Index.html');
    }

    closeView(): void{
        if(this.Controller.Windows.has("settings")){
        this.Controller.Windows.get("settings").closeView();
        this.Controller.Windows.delete("settings");
        }
        this.Controller.Windows.delete("index");
        this.Window.close();
    }
}