import { ipcMain } from "electron/main";

export namespace SyncFromServer {
    export class SyncMap<K, V> implements Map<K, V>{
        constructor(readonly name: string) {
            ipcMain.handle("get--" + name, (ev) => {
                return JSON.stringify([...this.map]);
            })
            ipcMain.on("on--" + name, (ev) => {
                const wc: Electron.WebContents = ev.sender;
                wc.on("destroyed", () => {
                    this.listener.delete(wc);
                })
                this.listener.add(wc);
            })
        }
        private listener = new Set<Electron.WebContents>();
        public updated(): void {
            this.listener.forEach(_ => _.send("update--" + this.name));
        }
        private readonly map = new Map<K, V>();
        clear(): void {
            process.nextTick(this.updated.bind(this));
            this.map.clear();
        }
        delete(key: K): boolean {
            process.nextTick(this.updated.bind(this));
            return this.map.delete(key);
        }
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
            return this.map.forEach(callbackfn, thisArg);
        }
        get(key: K): V | undefined {
            return this.map.get(key);
        }
        has(key: K): boolean {
            return this.map.has(key);
        }
        set(key: K, value: V): this {
            process.nextTick(this.updated.bind(this));
            this.map.set(key, value);
            return this;
        }
        get size() {
            return this.map.size;
        }
        entries(): IterableIterator<[K, V]> {
            return this.map.entries();
        }
        keys(): IterableIterator<K> {
            return this.map.keys();
        }
        values(): IterableIterator<V> {
            return this.map.values();
        }
        get [Symbol.iterator]() {
            return this.map[Symbol.iterator];
        }
        get [Symbol.toStringTag]() {
            return this.map[Symbol.toStringTag];
        }

    }
}
