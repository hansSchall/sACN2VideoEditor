import { Worker } from "worker_threads";
import { config } from "../../src/config";
import { sACN2VideoInstance } from "./sacn2video";

export class sACN2VideoLocalInstance extends sACN2VideoInstance {
    constructor(readonly path: string, readonly port: "auto" | number, readonly label: string) {
        super();
        console.log(`starting sACN2video ${path} ${port}`)
        this.instance = new Worker(config.sacn2videoServer, {
            workerData: {
                file: path,
                port,
            }
        })
        this.instance.on("message", val => {
            if (val?.type == "port") {
                this.realPort = parseInt(val?.port);
                this.updateClientItem();
            }
        })
        this.instance.on("exit", (code) => {
            this.exited = true;
            console.log(`sACN2video Worker of ${this.id}/${this.label} exited (${code})`);
            this.labelStatus = " [beendet]";
            this.updateClientItem();
            setTimeout(() => {
                this.removeItems();
            }, 5000);
        })
    }

    private realPort: number = -1;

    private instance: Worker;

    private exited: boolean = false;

    private labelStatus: string = "";

    getServer(): string {
        return "localhost";
    }
    getPort(): number {
        return this.realPort;
    }
    getFile(): string {
        return this.path;
    }
    getLabel(): string {
        return this.label + this.labelStatus;
    }
    getHost(): string {
        return config.localIP + ":" + this.realPort;
    }
    async exit() {
        this.labelStatus = " [wird beendet]";
        this.updateClientItem();
        await this.instance.terminate();
        this.exited = true;
    }
    async runSQL(sql: string, params: any[]): Promise<any[]> {
        if (this.exited)
            return Promise.reject("Server not usable anymore");
        else {
            try {

                const url = new URL("http://localhost:" + this.getPort() + "/api/v3/ext/run-sql?sql=" + encodeURIComponent(sql) + (params?.length ? ("&params=" + encodeURIComponent(JSON.stringify(params))) : ""));
                console.log("fetch:", url.href);
                const raw = await (await fetch(url)).text();
                return JSON.parse(raw);
            } catch (err) {
                console.error(err);
                return [{
                    error: "Error",
                }];
            }
        }
    }
}
