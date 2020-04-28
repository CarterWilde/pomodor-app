import { BrowserWindow, IpcMain } from "electron";
import { ApplicationController } from "../ApplicationController";

export class View{
    Window: BrowserWindow;
    Controller: ApplicationController;
    constructor(Controller: ApplicationController) {
        this.Controller = Controller;
    }
}