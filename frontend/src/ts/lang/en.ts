import { LangDef } from "./lang";

const langDefBase: Record<string, string> = {
    overview: "Overview",
    addServer: "add server",
    runningSACN2VideoServers: "running sACN2Video servers:",
    view: "View",
    edit: "Edit",
    copyURL: "copy URL",
    stop: "Stop",
    logs: "Logs",
    save: "Save",
    cancel: "Cancel",
    ok: "OK",
    add: "Add",
    label: "Label",
    file: "File",
    path: "Path",
    filepath: "Filepath",
    editSql: "edit SQL",
    autoAssignPort: "automatically assign ports",
    server: "Server",
    addRemoteServer: "add remote server",
    manageAssets: "Manage assets",
    reload: "Reload",
}

export const langEn: LangDef = {
    data: new Map(),
    defaultTo: "de",
    label: "Englisch",
};

for (let tr in langDefBase) {
    langEn.data.set(tr, langDefBase[tr]);
}
