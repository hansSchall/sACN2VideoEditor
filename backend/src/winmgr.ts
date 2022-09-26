import { BrowserWindow } from "electron";
import { join } from "path";
import { expPort } from "../backend";


export class AppWindow {
    constructor(readonly app: string, readonly args: [string, string][] = []) {
        this.win = new BrowserWindow({
            titleBarStyle: 'hidden',
            titleBarOverlay: {
                color: '#02B514',
                symbolColor: '#222',
                height: 30
            },
            webPreferences: {
                preload: join(__dirname, "../preload.js"),
            }
        })
        this.win.loadURL(`http://localhost:${expPort}/?app=${app}${args.map(([k, v]) => `&${k}=${v}`).join("")}`);
    }
    readonly win: BrowserWindow;
}
