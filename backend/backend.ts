import express from "express";
import { app, ipcMain, BrowserWindow, dialog } from "electron/main";
import { join } from "path";
import { AppWindow } from "./src/winmgr";
import { SyncFromServer } from "./src/sync/fromServer";
import { sacn2videoClientserverList } from "./components/sacn2video/sacn2video";

const expApp = express();
export let expPort: number = 0;

expApp.use(express.static(join(__dirname, "../../frontend/dist")));

const server = expApp.listen(() => {
    const addr = server.address();
    if (typeof addr == "string") {
        console.log(addr);
    } else {
        const port = addr?.port || 0;
        expPort = port;
    }
});

app.whenReady().then(main);

function main() {
    const homeWin = new AppWindow("about:home");
    homeWin.win.maximize();
}

ipcMain.handle("open-window", (ev, appName: string, args?: [string, string][]) => {
    new AppWindow(appName, args || []);
})

ipcMain.handle("close-win", (ev) => {
    BrowserWindow.fromWebContents(ev.sender)?.close();
})

ipcMain.handle("open-file", (ev, options) => {
    return dialog.showOpenDialog(BrowserWindow.fromWebContents(ev.sender) as BrowserWindow, options);
})

sacn2videoClientserverList;

export let localIP = "10.101.111.1";
