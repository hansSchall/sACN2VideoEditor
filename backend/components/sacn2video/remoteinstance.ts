import { sACN2VideoInstance } from "./sacn2video";

export class sACN2VideoRemoteInstance extends sACN2VideoInstance {
    constructor(readonly server: string, readonly port: number, readonly label: string) {
        super();
    }

    getServer(): string {
        return this.server;
    }
    getPort(): number {
        return this.port;
    }
    getFile(): string {
        return "remote";
    }
    getLabel(): string {
        return this.label + " [remote]";
    }
    getHost(): string {
        return this.server + ":" + this.port;
    }
    async runSQL(sql: string, params: any[]): Promise<any[]> {
        const url = new URL("http://" + this.getServer() + ":" + this.getPort() + "/api/v3/ext/run-sql?sql=" + encodeURIComponent(sql) + (params?.length ? ("&params=" + encodeURIComponent(JSON.stringify(params))) : ""));
        console.log("fetch:", url.href);
        const raw = await (await fetch(url)).text();
        return JSON.parse(raw);
    }
    exit(): void {
        this.removeItems();
    }
}
