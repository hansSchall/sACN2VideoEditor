import { localIP } from "../../backend";
import { sACN2VideoInstance } from "./sacn2video";

export class sACN2VideoLocalInstance extends sACN2VideoInstance {
    constructor(readonly path: string, readonly port: "auto" | number, readonly label: string) {
        super();
    }

    private realPort: string = "unknown";

    getServer(): string {
        return "localhost";
    }
    getPort(): string {
        return this.realPort;
    }
    getFile(): string {
        return this.path;
    }
    getLabel(): string {
        return this.label;
    }
    getHost(): string {
        return localIP + ":" + this.realPort;
    }
    async runSQL(sql: string): Promise<any[]> {
        return [
            {
                a: 5,
                b: 6
            },
            {
                a: 7,
                b: 8,
            }
        ];
    }
}
