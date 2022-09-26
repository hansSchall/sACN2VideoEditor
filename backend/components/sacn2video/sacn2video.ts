import { SyncFromServer } from "../../src/sync/fromServer";
import { v4 as uuid4 } from "uuid";
import { ipcMain, BrowserWindow } from "electron/main"

export abstract class sACN2VideoInstance {
    constructor() {
        process.nextTick(() => {
            this.updateClientItem();
        })
        sacn2videoServers.set(this.id, this);
    }

    updateClientItem() {
        sacn2videoClientserverList.set(this.id, {
            label: this.getLabel(),
            remote: true,
            server: this.getServer(),
            port: this.getPort(),
            file: this.getFile(),
            url: this.getURL(),
        })
    }

    abstract runSQL(sql: string): Promise<any[]>;
    abstract getHost(): string;
    abstract getServer(): string;
    abstract getPort(): number;
    abstract getFile(): string;
    abstract getLabel(): string;

    getURL(): string {
        return "http://" + this.getHost() + "/";
    }

    readonly id = uuid4();
}

import { sACN2VideoRemoteInstance } from "./remoteinstance";
import { sACN2VideoLocalInstance } from "./localinstance";

export const sacn2videoClientserverList = new SyncFromServer.SyncMap<string, {
    label: string,
    remote: boolean,
    server: string,
    port: number,
    file: string,
    url: string,
}>("sacn2videoServerList");

export const sacn2videoServers = new Map<string, sACN2VideoInstance>();

ipcMain.handle("add-server", (ev, options: {
    label: string,
    file: string,
    port: "auto" | number,
}) => {
    new sACN2VideoLocalInstance(options.file, options.port, options.label);
})

ipcMain.handle("add-remote-server", (ev, options: {
    label: string,
    server: string,
    port: number,
}) => {
    new sACN2VideoRemoteInstance(options.server, options.port, options.label);
})

ipcMain.handle("run-sql", (ev, id: string, query: string) => {
    const server = sacn2videoServers.get(id);
    if (server) {
        return server.runSQL(query);
    } else {
        throw new Error("Server not found");
    }
})



new sACN2VideoLocalInstance("c:/hans/technik/theater2022/right.s2v", 8001, "Right")
new sACN2VideoRemoteInstance("10.101.111.2", 8001, "Right")
