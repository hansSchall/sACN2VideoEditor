// This config file is updated on automatic build

import path from "path";
import { ConfigOptions } from "./config";

export const isBuild = false;

export const buildConfig: ConfigOptions = {
    // .. out of src
    // .. out of dist
    // .. out of backend
    // .. out of sACN2VideoEditor
    // .. out of sACN2VideoEditor (2)
    sacn2videoServer: path.join(__dirname, "../../../../../sACN2Video/server/server.js"),
    localIP: "127.0.0.1",
}
