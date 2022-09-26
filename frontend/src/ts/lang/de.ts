import { LangDef } from "./lang";

const langDefBase: Record<string, string> = {
    overview: "Überblick",
    addServer: "Server hinzufügen",
    runningSACN2VideoServers: "laufende sACN2Video Server:",
    view: "Anzeigen",
    edit: "Bearbeiten",
    copyURL: "URL kopieren",
    stop: "Anhalten",
    logs: "Logs",
    save: "Speichern",
    cancel: "Abbrechen",
    ok: "OK",
    add: "Hinzufügen",
    label: "Label",
    file: "Datei",
    path: "Pfad",
    filepath: "Dateipfad",
    editSql: "SQL bearbeiten",
    autoAssignPort: "Port automatisch zuweisen",
    server: "Server",
    addRemoteServer: "Remote Server hinzufügen",
    manageAssets: "Assets verwalten",
    reload: "Neu laden",
}

export const langDe: LangDef = {
    data: new Map(),
    defaultTo: "en",
    label: "Deutsch"
};

for (let tr in langDefBase) {
    langDe.data.set(tr, langDefBase[tr]);
}
