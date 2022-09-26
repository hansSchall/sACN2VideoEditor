import { ipcRenderer, contextBridge } from "electron"

contextBridge.exposeInMainWorld("ipc", {
    ...ipcRenderer,
    on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) {
        ipcRenderer.on(channel, listener);
    },
    removeListener(channel: string, listener: (...args: any[]) => void) {
        ipcRenderer.removeListener(channel, listener);
    }
});
