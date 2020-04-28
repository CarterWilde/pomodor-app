import { app, ipcMain } from "electron";
import { Index } from "./Views/index";
import { IView } from "./Scripts/IView";
import { View } from "./Scripts/View";

export class ApplicationController {
    Windows: Map<String, View & IView> = new Map<String, View & IView>();
    Global: {[k: string]: any} = {};
    constructor(global: {[k: string]: any} = {}){
        this.Global = global;
    }
}

let appController: ApplicationController = new ApplicationController();

app.on('ready', () => {
    appController.Windows.set("index", new Index(appController));
    appController.Windows.get("index").startView();
});

ipcMain.on("timer-done", () => {
    if(appController.Windows.has("popup")){
        appController.Windows.get("popup").closeView();
    } 
    
    if(!appController.Windows.has("index")){
        appController.Windows.set("index", new Index(appController));
        appController.Windows.get("index").startView();
    }
})

module.exports = ApplicationController;