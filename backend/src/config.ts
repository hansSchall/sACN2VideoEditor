import { resolve } from "path";
import { buildConfig, isBuild } from "./build.config";
import { devConfig } from "./dev.config";

export interface ConfigOptions {
    sacn2videoServer: string,
    localIP: string,
}

export const config = isBuild ? buildConfig : devConfig;
