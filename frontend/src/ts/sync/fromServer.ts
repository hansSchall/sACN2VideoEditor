import { useEffect, useState } from "react";
import lock from "../../utils/lock";

export namespace SyncFromServer {
    export class SyncedMapSync<K, V>{
        constructor(readonly name: string) {
            this.getAllData();
            ipc.on("update--" + name, this.handleUpdate);
            ipc.send("on--" + name);
        }
        public destroy() {
            ipc.removeListener("update--" + this.name, this.handleUpdate);
        }
        private handleUpdate = this.getAllData.bind(this);
        private async getAllData() {
            await this.lock();
            this.lock.lock();
            const res = JSON.parse(await ipc.invoke("get--" + this.name));
            console.log(res);
            this.map.clear();
            for (let [k, v] of res) {
                this.map.set(k, v);
            }
            if (this.reactEventListener) {
                const newMap = new Map<K, V>(res);
                this.reactEventListener(newMap);
            }
            this.lock.unlock();
        }
        public reactEventListener?: (newMap: Map<K, V>) => void;
        public readonly lock = lock();
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
            return this.map.forEach(callbackfn, thisArg);
        }
        get(key: K): V | undefined {
            return this.map.get(key);
        }
        has(key: K): boolean {
            return this.map.has(key);
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
        private readonly map = new Map<K, V>();
    }
    export class SyncedMapAsync<K, V>{
        constructor(readonly name: string) {
            this.sync = new SyncedMapSync(name);
        }
        private sync: SyncedMapSync<K, V>;

        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
            return this.map.forEach(callbackfn, thisArg);
        }
        async get(key: K): Promise<V | undefined> {
            await this.sync.lock();
            return this.map.get(key);
        }
        async has(key: K): Promise<boolean> {
            return this.map.has(key);
        }
        get size() {
            return (async () => {
                await this.sync.lock();
                return this.map.size;
            })();
        }
        async entries(): Promise<IterableIterator<[K, V]>> {
            return this.map.entries();
        }
        async keys(): Promise<IterableIterator<K>> {
            return this.map.keys();
        }
        async values(): Promise<IterableIterator<V>> {
            return this.map.values();
        }
        get [Symbol.iterator]() {
            return (async () => {
                await this.sync.lock()
                return this.map[Symbol.iterator];
            })();
        }
        get full(): Promise<Map<K, V>> {
            return (async () => {
                return this.map;
            })();
        }
        get [Symbol.toStringTag]() {
            return (async () => {
                await this.sync.lock()
                return this.map[Symbol.toStringTag];
            })();
        }
        private readonly map = new Map<K, V>();
    }

    export function useSyncedMapSync<K, V>(name: string) {
        const [map, setMap] = useState(new Map<K, V>());
        useEffect(() => {
            const sync = new SyncedMapSync<K, V>(name);
            sync.reactEventListener = (newMap) => {
                setMap(newMap);
            }
            return () => {
                sync.destroy();
            }
        }, []);
        return map;
    }
}
