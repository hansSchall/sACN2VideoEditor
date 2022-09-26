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
    async runSQL(sql: string): Promise<any[]> {
        return [];
    }
}
